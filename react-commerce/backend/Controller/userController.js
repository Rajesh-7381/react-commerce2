const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/email");
const { registerSchema, passwordForgotSchema } = require("../utils/Validation");
const {  cloudinary } = require("../helper/cloudinaryConfig");
const  sendMail  = require("../utils/email");
const { sendEmail2 } = require("../utils/email"); // ✅ For OTP emails
const { UUID } = require("../utils/UserIID");
const redisClient=require("../config/redisClient")
const sheets  = require('../service/gSheet'); // Adjust the path as necessary
const {logger}=require('../utils/logger');
const handleAsync = require("../Middleware/ErrorHandler");
// const Salt=process.env.GEN_SALT;
  // console.log(Salt)

  // for admin or subadmin or user login
  const SALTROUNDS=parseInt(process.env.GEN_SALT);
  // console.log(SALTROUNDS)
  const Login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      logger.warn((`Failed login attempt for email: ${email}`))
      return res.status(400).json({ status: 0, message: "🚫 Email and password are required" });
    }
  
    User.CheckAdminUserLogin(email, async (err, user) => {
      if (err) {
        logger.error(`Failed login attempt for email: ${email}`);
        console.error("Error retrieving user:", err);
        return res.status(500).json({ status: 0, message: "🚫 Internal server error" });
      }
  
      if (!user) {
        logger.error(`⚠️ Invalid email or password: ${email}`);
        return res.status(401).json({ status: 0, message: "⚠️ Invalid email or password" });
      }
  
      // Check if account is locked
      if (user.account_locked_until && new Date(user.account_locked_until) > new Date()) {
        logger.error(`Account is temporarily locked until: ${user.account_locked_until}`);
        return res.status(403).json({
          status: 0,
          message: `🚫 Account is temporarily locked until ${user.account_locked_until}`,
        });
      }
  
      try {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          const failedAttempts = user.failed_attempts + 1;
          const lockAccount =
            failedAttempts >= 3 ? ", account_locked_until = DATE_ADD(NOW(), INTERVAL 24 HOUR)" : "";
  
          User.checkFailedAttempts.checkFailedAttempts(lockAccount, failedAttempts, user.id, (message) => {
            return res.status(401).json({ status: 0, message });
          });
          return;
        }
  
        // Reset failed attempts
        await User.resetFailedAttempts.resetFailedAttempts(user.id);
  
        // Generate JWT token
        const token = jwt.sign({email: user.email, role: user.role, id: user.id,}, process.env.JWT_SECRET, { expiresIn: "24h" });
  
        // Log user activity
        User.UserActivityLog.UserActivityLog(user.id, "login", req.ip, req.headers["user-agent"]);
        logger.info(`User login successful: ${email}`);
        return res.status(200).json({  status: 1,  message: "Login successful",  email: user.email,  role: user.role,  id: user.id,  token,});
      } catch (error) {
        logger.error(`Error during login: ${err.message}`);
        console.error("Error during authentication:", error);
        return res.status(500).json({ status: 0, message: "🚫 Internal server error" });
      }
    });
  };
  
// for registering new one
class RegisterUser{
   async CreateRegisterAdminUser(req,res){
    // console.log(1)
    try {
      const combinedData={  ...req.body,  image:req.file,};
      const { error }=registerSchema.validate(combinedData);

      if(error){
        logger.error(`🚫 Invalid request body: ${error.details}`);
        return res.status(400).json({message:"🚫 Invalid request body", error: error.details})
      }

      const {name,mobile,email,password}=req.body;
      // console.log(req.body)
      const uuid=await UUID();
      if(await User.User.exists(email,mobile)){
        logger.warn(`⚠️ Email or mobile number already exists`);
        return res.status(400).json({message:"⚠️ Email or mobile number already exists"})
      }
      const image=req.file ? await cloudinary.uploader.upload(req.file.path,{ folder:'User'}) : null; //to check cloudinary folder

      const user=new User.User(name,mobile,email,password,image ,uuid)
      await user.Save();
      // await sendMail(email, "Welcome to E-commerce", `Hi ${name}, thank you for registering.`)
      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await User.User.storeOTP(email, otp);
      await sendEmail2(email, "Your OTP Code", `<p>Your OTP is <strong>${otp}</strong>. It is valid for 10 minutes.</p>`);
      await this.logEnquiry(name,mobile, email, password);
      logger.info(`✅ User created successfully!: ${email}`);
      res.json({message:"✅ User created successfully!"});
    } catch (error) {
      console.error("🚫 Internal server error", error);
      res.status(500).json({ message: "🚫 Internal server error" });
    }
  }
  async logEnquiry(name, mobile, email, password) {
    try {
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID, 
        range: 'Users!A:D', 
        insertDataOption: 'INSERT_ROWS',
        valueInputOption: 'RAW',
        requestBody: {
          values: [[name,mobile, email, password]], 
        },
    });

       if (response.status !== 200) {
        logger.error(`Failed to log enquiry to Google Sheets`);
        throw new Error('Failed to log enquiry to Google Sheets');
      }
    } catch (error) {
        logger.error(`Error logging enquiry: ${error}`);
        console.error('Error logging enquiry:', error);
        throw new Error('Logging enquiry failed');
    }
}
}
class AdminUserController{
  static async checkUniqeID(req,res){
    try {
      const unique_id=req.params.unique_id;
      // console.log(un)
      const result=await User.AdminUserModel.findByUUID(unique_id);
     
      const UniqueIdExists=result.length > 0
      logger.info(`Successfully to Check Unique Id}`);
      res.json({UniqueIdExists})
    } catch (error) {
       logger.error(`Error Checking Unique Id: ${error}`);
       console.error("Error Checking Unique Id", error);
       res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async checkEmail(req,res){
    try {
      const email = req.params.email;
      const result=await User.EmailCheck.findByEmail(email);
      const emailExists=result.length > 0;
      logger.info(`email get successfully!}`);
      res.json({ emailExists })
    } catch (error) {
        logger.error(`Error checking email: ${error}`);
        console.error("Error checking email:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async Mobile(req,res){
      try {
        const { mobile } = req.params; 
        const result = await User.MobileCheck.findByMobile(mobile);
        const mobileExists = result.length > 0;
        logger.info(`mobile getting successfully!}`);
        res.status(200).json({ mobileExists }); 
      } catch (error) {
         logger.error(`Error checking mobile: ${mobile}`);
         console.error("Error checking mobile:", error);
         res.status(500).json({ error: "Internal Server Error" }); 
      }
    
  }

  // static async forgotPassword(req,res){
  //   try {
      
  //     const email=req.params.email;
  //     const  newPassword =req.body.password;
  //     await User.forgotPassword.updatePassword(email,newPassword)
  //     logger.info(`Password updated successfully!`);
  //     return res.status(200).json({message:" Password updated successfully!"})
  //   } catch (error) {
  //       logger.error(`Internal server error`);
  //       console.error(error);
  //       return res.status(500).json({ error: " Internal server error" });
  //   }
  // }

  static async forgotPassword(req,res){
    try {
      const email = req.params.email;
      const newPassword = req.body.password;
      await User.forgotPassword.updatePassword(email,newPassword)
      logger.info("Password updated successfully!");
      return res.status(200).json({ message: "Password updated successfully!" });
    } catch (error) {
      logger.error("Internal server error");
      console.error(error);
      return res.status(500).json({ error: error.message || "Internal server error" });
    }
  }

  static async countUser(req,res){
    try {
      const count=await User.TotalUser.TotalUser();
      logger.info(`user counting successfully!`);
      res.json({userCount:count})
    } catch (error) {
        logger.error(`Failed to countuser`);
        console.log(error)
    }
  }
  static async countAdmin(req,res){
    try {
      const Admincount=await User.TotalAdmin.TotalAdmin();
      logger.info(`Admin counting successfully!`);
      res.json({adminCount:Admincount,message:"count successfully!"})
    } catch (error) {
        logger.error(`failed to Admin counting `);
        console.log(error)
    }
  }
  static async countSubAdmin(req,res){
    try {
      const subaAdmincount=await User.TotalSubAdmin.TotalSubAdmin();
      logger.info(`SubAdmin counting successfully!`);
      res.json({subAdminCount:subaAdmincount,message:"count successfully!"})
    } catch (error) {
        logger.error(`Failed to countsubadmin}`);
        console.log(error)
    }
  }
  static async getAllAdminSubadminUsers(req,res){
    try {
      const result=await User.getAllAdminSubadminUsers.TotalAdminSubAdminUser();
      logger.info(`get all AdminSubadminUsers details`);
      res.json(result)
    } catch (error) {
        logger.error(`Failed to fetch getAllAdminSubadminUsers`);
        console.log(error)
    }
  }

  static async indvidualDetails(req,res){
    try {const id=req.params.id;
      const result=await User.indvidualDetails.SingleUserAdminSubadmibDetails(id);
      logger.info(`to get SingleUserAdminSubadmibDetails}`);
      res.json(result)
    } catch (error) {
        logger.error(`wrong id entered,please enter coorect id`);
        res.json({message:"wrong id entered,please enter coorect id"})
    }
  }
  static async EditDetails(req,res){
    try {
      const id=req.params.id;
      const result=await User.indvidualDetails.SingleUserAdminSubadmibDetails(id);
      logger.info(`Successfully to get SingleUserAdminSubadmibDetails`);
      res.json({message:"single data get successfully!",result})
    } catch (error) {
        logger.error(`Failed to to get}`);
        console.error(error)
    }
  }

  static async Update(req,res){
    try {
      const id=req.params.id;
      const { name, mobile, email, password, role } = req.body;
      const result=await User.UpdateDetails.Update(name, mobile, email, password, role, id);
      logger.info(`user update successfully!`);
      res.json({message:"updated successfully!"})
    } catch (error) {
        logger.error(`Failed to update user}`);
        console.log(error)
    }
  }

  static async deleteAdminSubAdminUser(req, res) {
    try {
      const id = req.params.id;
      const result = await User.Delete.deleteData(id);
      logger.info(`deleted successfully!`);
      res.json({ message: "deleted successfully!" });
    } catch (error) {
      logger.error(`Failed to deleted }`);
      res.status(500).json({ message: "Error deleting user", error: error.message });
    }
  }

  static async SearchAdminSubAdminUser(req,res){
    try {
      const searchTerm = req.params.searchTerm;
      const results=await User.SearchAdminSubAdminUser.SearchDetails(searchTerm)
      logger.info(`searching successfull}`);
      res.json(results)
    } catch (error) {
        logger.error(`searching unsuccessfull}`);
        console.error(error)
    }
  }

  static registerUserParticularDate=handleAsync(
    async(req)=>{
      const {date}=req.params;
      const data=await User.registerUserParticularDate.SearchDate(date)
      return {count:data.length,data}
    },
    'Fetched data for a particular date',
    logger
  )

  static registerUserfromrDateTotodate=handleAsync(
    async(req)=>{
      const { fromdate, todate } = req.params;
      const results=await User.registerUserfromrDateTotodate.SearchDate(fromdate,todate) 
      return results;
    },
    `Fetched data from the date range`,
    logger
  )

  static getAllSubAdminData=handleAsync(
    async(req)=>{
      const results=await User.getAllSubAdminData.getAll()
      return results;
    },
    `Fetched all subadmin data`,
    logger
  )

  // for read and write using stream
  static async documents(req, res) {
    try {
      if (req.method === 'GET') {
          const result = await User.DOCX.docx()
          logger.info(`to get all documents data `);
          res.json(result)
      } else if (req.method === 'PATCH') {
          let {doc} = req.body
          // console.log(doc)
          const updatedResult = await User.DOCX.updateDocx(doc)
          logger.info(`to update all documents data`);
          res.json(updatedResult)
      } else {
        logger.warn(`Method not allowed`);
        res.status(405).json({ error: 'Method not allowed' })
      }
    } catch (error) {
      logger.error(`Internal server error`);
      console.log(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  // static documents=handleAsync(
  //   async(req)=>{
  //     if(req.method === 'GET'){
  //       const result=await new User.DOCX().docx()
  //       return result
  //     }else if(req.method === 'PATCH'){
  //       const {doc}=req.body;
  //       const updatedResult=await new User.DOCX().updateDocx(doc)
  //       return updatedResult;
  //     }else{
  //       throw new Error('method not allowed')
  //     }
  //   },
  //   'Handled documents request',
  //   logger
  // )
}

class Logout {
  static async Logout(req, res) {
    try {
      const { id } = req.body;
      if (!id) {
        logger.warn(`User ID is required.`);
        return res.status(400).json({ message: 'User ID is required.' });
      }
      // Call the model's logout method
      await User.Logout.Logout(id, 'logout', req.ip, req.headers["user-agent"]);
      logger.info(`logged out successfully}`);
      return res.status(200).json({ message: 'Logout successful.' });
    } catch (error) {
      logger.error(`Error during logout`);
      console.error('Error during logout:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }
}
 
module.exports= { AdminUserController,Login,RegisterUser,Logout}
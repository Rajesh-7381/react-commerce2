const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/email");
const { registerSchema, passwordForgotSchema } = require("../utils/Validation");
const { uploadImage, cloudinary } = require("../helper/cloudinaryConfig");
const  sendMail  = require("../utils/email");
const { UUID } = require("../utils/UserIID");


// const Salt=process.env.GEN_SALT;
  // console.log(Salt)

  // for admin or subadmin or user login
  const SALTROUNDS=parseInt(process.env.GEN_SALT);
  // console.log(SALTROUNDS)
const Login=async(req,res)=>{
  
  const { email,password,check }=req.body;
  // console.log(req.body);

  if(!email || !password){
    return res.status(400).json({status:0,message:"🚫 Email and password are required"})
  }
   User.CheckAdminUserLogin(email,async(err,user)=>{
    // console.log(User.CheckAdminUserLogin())
    if (err) {
      console.error('Error retrieving user:', err);
      return res.status(500).json({ status: 0, message: '🚫 Internal server error' });
    }
    if(!user){
      return res.status(401).json({status:0,message:"⚠️ Invalid email or password"})
    }
    // console.log(user)
    try {
      const match=await bcrypt.compare(password,user.password);
      // console.log(match) //return true(if match) or false
      // console.log(password,user.password) 
      if(!match){
        return res.status(401).json({status:0,message:"⚠️ Invalid email or password"})
        // console.log(match)
      }
      
      // console.log(user.id)
      // console.log(jwt)
      const token=jwt.sign({
        email:user.email,
        role:user.role,
        id:user.id,
      },
      process.env.JWT_SECRET,
      {expiresIn:'24h'} //dont extra space required otherwise it shown error
    );
    // console.log(user.id)
    
    res.status(200).json({
      status: 1,
      message: "Login successful",
      email: user.email,
      role: user.role,
      id: user.id,
      token: token,
    });
    } catch (error) {
      console.error('🚫 Error during authentication:', err);
      res.status(500).json({ status: 0, message: '🚫 Internal server error' });
    }
   })
}
// for registering new one
class RegisterUser{
   async CreateRegisterAdminUser(req,res){
    try {
      const combinedData={
        ...req.body,
        image:req.file,
      };

      const { error }=registerSchema.validate(combinedData);

      if(error){
        return res.status(400).json({message:"🚫 Invalid request body", error: error.details})
      }

      const {name,mobile,email,password}=req.body;
      const uuid=await UUID();
      // console.log(uuid)
      // here 1st user is import user and 2nd is user class
      if(await User.User.exists(email,mobile)){
        return res.status(400).json({message:"⚠️ Email or mobile number already exists"})
      }
      // console.log(uuid)
      const user=new User.User(name,mobile,email,password,req.file ? await cloudinary.uploader.upload(req.file.path) :null,uuid)
      // console.log(1)
      await user.Save();
      console.log(1)
      await sendMail(email, "Welcome to E-commerce", `Hi ${name}, thank you for registering.`)
      res.json({message:"✅ User created successfully!"});
    } catch (error) {
      console.error("🚫 Error submitting form", error);
      res.status(500).json({ message: "🚫 Internal server error" });
    }
  }
}
class AdminUserController{
  static async checkUniqeID(req,res){
    try {
      const unique_id=req.params.unique_id;
      const result=await User.AdminUserModel.findByUUID(unique_id);
     
      const UniqueIdExists=result.length > 0
      res.json({UniqueIdExists})
    } catch (error) {
      console.error("Error Checking Unique Id", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async checkEmail(req,res){
    try {
      const email = req.params.email;
      console.log(email)
      const result=await User.EmailCheck.findByEmail(email);
      const emailExists=result.length > 0;
      console.log(emailExists)
      res.json({ emailExists })
    } catch (error) {
        console.error("Error checking email:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async checkMobile(req,res){
    try {
      const mobile=req.params.mobile;
      const result=await User.MobileCheck.findByMobile(mobile);
      const mobileExists=result.length > 0;
      res.json({ mobileExists })
    } catch (error) {
        console.error("Error checking mobile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async passwordForgot(req,res){
    try {
      const { error }=passwordForgotSchema.validate(req.body)
      if(error){
        return res
        .status(400)
        .json({ message: "🚫 invalid request body", error: error.details });
  
      }
      const email=req.params.email;
      const newPassword=req.body.password;
      console.log(email + " "+newPassword)
      
      await User.forgotPassword.updatePassword(email,newPassword)
      return res.status(200).json({message:"✅ Password updated successfully!"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "🚫 Internal server error" });
    }
  }

  static async countUser(req,res){
    try {
      const count=await User.TotalUser.TotalUser();
      res.json({count:count})
    } catch (error) {
      
    }
  }
  static async countAdmin(req,res){
    try {
      const Admincount=await User.TotalAdmin.TotalAdmin();
      res.json({Admincount:Admincount})
    } catch (error) {
      
    }
  }
  static async countSubAdmin(req,res){
    try {
      const subaAdmincount=await User.TotalSubAdmin.TotalSubAdmin();
      res.json({subaAdmincount:subaAdmincount})
    } catch (error) {
      
    }
  }
  static async getAllAdminSubadminUsers(req,res){
    try {
      const result=await User.getAllAdminSubadminUsers.TotalAdminSubAdminUser();
      res.json(result)
    } catch (error) {
      
    }
  }

  static async indvidualDetails(req,res){
    try {const id=req.params.id;
      const result=await User.indvidualDetails.SingleUserAdminSubadmibDetails(id);
      res.json(result)
    } catch (error) {
      
    }
  }
  static async EditDetails(req,res){
    try {
      const id=req.params.id;
      const result=await User.indvidualDetails.SingleUserAdminSubadmibDetails(id);
      res.json(result)
    } catch (error) {
      
    }
  }

  static async Update(req,res){
    try {
      const id=req.params.id;
      const { name, mobile, email, password, role } = req.body;
      const result=await User.UpdateDetails.Update(name, mobile, email, password, role, id);
      res.json(result)
    } catch (error) {
      
    }
  }

  static async deleteAdminSubAdminUser(req,res){
    try {
      const id=req.params.id;
      
      const result=await User.Delete.DeleteData(id);
      res.json(result)
    } catch (error) {
      
    }
  }

  static async SearchAdminSubAdminUser(req,res){
    const searchTerm = req.params.searchTerm;
    const results=await User.SearchAdminSubAdminUser.SearchDetails(searchTerm)
    res.json(results)
  }
  static async registerUserParticularDate(req,res){
    const date = req.params.date;
    const results=await User.registerUserParticularDate.SearchDate(date)
    res.json(results)
  }
  static async registerUserfromrDateTotodate(req,res){
    const fromdate = req.params.fromdate;
    const todate = req.params.todate;
    const results=await User.registerUserfromrDateTotodate(fromdate, todate)
    res.json(results)
  }

  static async getAllSubAdminData(req,res){
    
    const results=await User.getAllSubAdminData.getAll()
    res.json(results)
  }
}


module.exports= { AdminUserController,Login,RegisterUser}
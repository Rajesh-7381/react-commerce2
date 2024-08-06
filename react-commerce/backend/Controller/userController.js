const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/email");
const { registerSchema } = require("../utils/Validation");
const { uploadImage, cloudinary } = require("../helper/cloudinaryConfig");
const  sendMail  = require("../utils/email");
const { UUID } = require("../utils/UserIID");


// const Salt=process.env.GEN_SALT;
  // console.log(Salt)

  // for admin or subadmin or user login
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
}

const checkemail=async(req,res)=>{
  const email=req.params.email;
  const EmailExist=await emailExist(email)
}
module.exports= { AdminUserController,Login,RegisterUser}
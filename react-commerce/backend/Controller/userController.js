const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/email");
const { registerSchema } = require("../utils/Validation");
const { uploadImage } = require("../helper/cloudinaryConfig");
const { sendMail } = require("../Email/nodemailerConfig");


const Salt=process.env.GEN_SALT;

const registerUser=async(req,res)=>{
  const CombinedData={
    ...req.body,
    image:req.file
  };

  const { error }=registerSchema.validate(CombinedData);
  if(error){
    return res.status(400).json({ message: "🚫 Invalid request body", error: error.details })
  }

  const {name,email,mobile,password}=req.body;
  try {
    const userExist=await User.getUserEmailOrMobile(email,mobile);
    if(userExist > 0){
      return res.status(400).json({ message: "🚫 Email or mobile number already exists" });
    }
    const salt=await bcrypt.genSalt(Salt);
    const hashedPassword=await bcrypt.hash(password,salt);
    let imageUrl=null;

    if(req.file){
      const UpLoadImagePath=await uploadImage(req.file.path);
      imageUrl=UpLoadImagePath.secure_url;
    }

    await User.createUser(name, mobile, email, hashedPassword, imageUrl);
    await sendMail(email, "Welcome to E-commerce", `Hi ${name}, thank you for registering.`)


    res.json({ message: "✅ User created successfully!" });
  } catch (error) {

      console.error("🚫 Error submitting form", err);
      res.status(500).json({ message: "🚫 Internal server error" });
  }
}
module.exports={ registerUser };
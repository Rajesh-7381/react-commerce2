const express = require("express");
const router=express.Router();
const AuthController=require("../Controller/authController");
// for image uploading
const upload=require("../utils/multerConfig");

router.post("/register",upload.single("image"),AuthController.register);
router.post("/login",AuthController.login);

module.exports=router;

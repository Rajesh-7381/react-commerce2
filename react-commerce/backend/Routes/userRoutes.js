const express = require("express");
// for image uploading
const upload=require("../utils/multerConfig");
const { registerUser } = require("../Controller/userController");

const router=express.Router();

router.post("",upload.single("image"),registerUser);
router.post("",AuthController.login);

module.exports=router;

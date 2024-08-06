const express = require("express");
const router=express.Router();
const upload=require("../utils/multerConfig")

const { AdminUserModel } = require("../Models/User");
const { Login, RegisterUser } = require("../Controller/userController");

const registerusercontroller=new RegisterUser();
router.post("/register",upload.single("image"),(req,res)=>registerusercontroller.CreateRegisterAdminUser(req,res))
router.post("/login",Login)
router.get("/email/:email")
router.get("UniqueID/:unique_id",AdminUserModel)

module.exports=router;

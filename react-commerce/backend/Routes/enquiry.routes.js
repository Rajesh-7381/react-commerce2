const express=require("express");
const router=express.Router();
const enquiryController=require("../Controller/enquiry.controller.js")

router.post("/enquiry",enquiryController)

module.exports = router;
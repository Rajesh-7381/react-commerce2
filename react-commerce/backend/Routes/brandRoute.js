const express=require("express")
const router=express.Router();
const brandcontroller=require("../Controller/BrandController");

router.delete("/branddelete/:id",brandcontroller.brandDelete);

module.exports=router;
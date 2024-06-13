const db = require("../config/dbconfig");
const upload = require("../utils/multerConfig");
const Brand=require("../Models/Brand");

exports.brandDelete=async(req,res)=>{
    try {
        const id = req.params.id;
        const data=await Brand.DeleteBrand(id);
        res.json(data)
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
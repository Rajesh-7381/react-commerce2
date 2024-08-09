const { db } =require("../config/dbconfig");
const brand = require("../Models/Brand");

exports.getAllBrands=async(req,res)=>{
    try {
        const data=await Brand.getAll();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    };
};

exports.updateBrandStatus=async(req,res)=>{
    const id=req.params.id;
    const {status}=req.body;
    try {
        await Brand.updateStatus(id,status);
        res.status(200).json({ message: "Status updated successfully!" });
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    };
};

exports.deleteBrand = async (req, res) => {
    const id = req.params.id;
    try {
      await Brand.delete(id);
      res.status(200).json({ message: "Deleted successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.updateBrand = async (req, res) => {
    const id = req.params.id;
    const { title, url, description, meta_title, meta_keywords, meta_description } = req.body;
    
    const updatedBrand = {
      title,
      url,
      description,
      meta_title,
      meta_keywords,
      meta_description
    };
  
    try {
      await Brand.update(id, updatedBrand);
      res.status(200).json({ message: "Update successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.addBrand = async (req, res) => {
    const { title, url, description, meta_title, meta_keywords, meta_description } = req.body;
  
    const newBrand = {
      title,
      url,
      description,
      meta_title,
      meta_keywords,
      meta_description
    };
  
    try {
      await Brand.add(newBrand);
      res.status(200).json({ message: "Insertion successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.getBrandById = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await Brand.getById(id);
      if (result.length === 0) {
        return res.status(404).json({ message: "Data not found!" });
      }
      res.status(200).json({ data: result[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
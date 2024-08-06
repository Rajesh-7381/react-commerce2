const { db } =require("../config/dbconfig");
const CmsPage = require("../Models/CmsPage");

exports.getAllPages=async(req,res)=>{
    try {
        const data=await CmsPage.getAll();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    };
};

exports.updatePageStatus=async(req,res)=>{
    const id=req.params.id;
    const {status}=req.body;
    try {
        await CmsPage.updateStatus(id,status);
        res.status(200).json({ message: "Status updated successfully!" });
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    };
};

exports.deletePage = async (req, res) => {
    const id = req.params.id;
    try {
      await CmsPage.delete(id);
      res.status(200).json({ message: "Deleted successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.updatePage = async (req, res) => {
    const id = req.params.id;
    const { title, url, description, meta_title, meta_keywords, meta_description } = req.body;
    
    const updatedPage = {
      title,
      url,
      description,
      meta_title,
      meta_keywords,
      meta_description
    };
  
    try {
      await CmsPage.update(id, updatedPage);
      res.status(200).json({ message: "Update successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.addPage = async (req, res) => {
    const { title, url, description, meta_title, meta_keywords, meta_description } = req.body;
  
    const newPage = {
      title,
      url,
      description,
      meta_title,
      meta_keywords,
      meta_description
    };
  
    try {
      await CmsPage.add(newPage);
      res.status(200).json({ message: "Insertion successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.getPageById = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await CmsPage.getById(id);
      if (result.length === 0) {
        return res.status(404).json({ message: "Data not found!" });
      }
      res.status(200).json({ data: result[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
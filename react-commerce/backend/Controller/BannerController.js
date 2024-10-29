const Banner = require("../Models/Banner");
const { cloudinary } =require("../helper/cloudinaryConfig");

exports.getAllBanners=async(req,res)=>{
    try {
        const data=await Banner.getAll();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    };
};

exports.updateBannerStatus=async(req,res)=>{

    const id=req.params.id;
    const {status}=req.body;
    // console.log(1)
    // console.log(id)
    try {
        await Banner.updateStatus(id,status);
        res.status(200).json({ message: "Status updated successfully!" });
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    };
};

exports.deleteBanner = async (req, res) => {
    const id = req.params.id;
    // console.log(id)
    try {
      await Banner.delete(id);
      // console.log(id)
      res.status(200).json({ message: "Deleted successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.updateBanner = async (req, res) => {
    const id = req.params.id;
    const { title, url, description, meta_title, meta_keywords, meta_description } = req.body;
    const updatedBanner = {  title,  url,  description,  meta_title,  meta_keywords,  meta_description};
    try {
      await Banner.update(id, updatedBanner);
      res.status(200).json({ message: "Update successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.addBanner = async (req, res) => {
    // console.log("banner")
    const {  type, link, alt}=req.body;
    // const image = req.file ? req.file.filename : null;
    const image=req.file ? await cloudinary.uploader.upload(req.file.path,{folder:'Banners'}) : null
  // console.log(image)
    const newBanner = {image, type, link, alt };
    try {
      const result=await Banner.add(newBanner);
      // console.log(result)
      res.status(200).json({ message: "new Banner added successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.getBannerById = async (req, res) => {
    console.log(1)
    const id = req.params.id;
    console.log(id)
    try {
      const result = await Banner.getById(id);
      if (result.length === 0) {
        return res.status(404).json({ message: "Data not found!" });
      }
      res.status(200).json({ data: result[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
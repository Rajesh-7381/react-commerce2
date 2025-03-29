const Banner = require("../Models/Banner");
const { cloudinary } =require("../helper/cloudinaryConfig");
const sheets = require("../service/gSheet");

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
    const {AdminUser_id,  type, link, alt}=req.body;
    // const image = req.file ? req.file.filename : null;
    const image=req.file ? await cloudinary.uploader.upload(req.file.path,{folder:'Banners'}) : null
  // console.log(image)
    const newBanner = {AdminUser_id,image, type, link, alt };
    try {
      const result=await Banner.add(newBanner);
      // console.log(result)
      await logPageToGoogleSheets(newBanner)
      res.status(200).json({ message: "new Banner added successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  async function logPageToGoogleSheets(newBanner) {
    try {
      const response=await sheets.spreadsheets.values.append({
        spreadsheetId:process.env.GOOGLE_SHEET_ID,
        range:'Banners!A:D',
        insertDataOption:'INSERT_ROWS',
        valueInputOption:'RAW',
        requestBody:{
          values:[[newBanner.type,newBanner.link,newBanner.alt,newBanner.AdminUser_id]]
        }
      })

      if(response.status !==200){
        throw new Error('Failed to log page data to google sheets')
      }
    } catch (error) {
        console.error('Error logging page data',error)
        throw new Error('Logging page data failed')
    }
  }
  
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
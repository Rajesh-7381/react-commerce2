
const Brand = require("../Models/Brand");
const path=require("path")
const { cloudinary }=require("../helper/cloudinaryConfig");
const sheets = require("../service/gSheet");

exports.getAllBrands=async(req,res)=>{
    try {
        const data=await Brand.getAll();
        // console.log(data)
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    };
};

exports.updateBrandStatus=async(req,res)=>{
    const id=req.params.id;
    const {status}=req.body;
    // console.log(status)
    try {
        await Brand.updateStatus(id,status);
        // console.log(1)
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
    // console.log(id)
    const { brand_name, brand_discount, description,url, meta_title, meta_keywords, meta_description } = req.body;
    const brand_image = req.files?.brand_image ? path.basename(req.files.brand_image[0].path) : null; //[ath.basename extracts only image name not full path]
    const brand_logo = req.files?.brand_logo ? path.basename(req.files.brand_logo[0].path) : null;
    // console.log(req.body)
    // console.log(brand_image)
    // console.log(brand_logo)
    const updatedBrand = {  brand_name, brand_discount, description,url, meta_title, meta_keywords, meta_description,brand_image,brand_logo };
  
    try {
      await Brand.update(id, updatedBrand);
      res.status(200).json({ message: "Update successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.addBrand = async (req, res) => {
    const {AdminUser_id, brand_name, brand_discount,description,url, meta_title, meta_description,meta_keyword } = req.body;
    // console.log(req.body)
    // const brand_image = req.files?.brand_image ? path.basename(req.files.brand_image[0].path) : null; //[ath.basename extracts only image name not full path]
    // const brand_logo = req.files?.brand_logo ? path.basename(req.files.brand_logo[0].path) : null;
    const brand_image = req.files?.brand_image ? await cloudinary.uploader.upload(req.files.brand_image[0].path,{folder:'BrandIMAGE'}) : null; //[ath.basename extracts only image name not full path]
    const brand_logo = req.files?.brand_logo ? await cloudinary.uploader.upload(req.files.brand_logo[0].path,{folder:'BrandLogo'}) : null;
    // console.log(req.body)
    const newBrand = {AdminUser_id, brand_name, brand_image, brand_logo,brand_discount,description,url, meta_title, meta_description,meta_keyword  };
    try {
      await Brand.add(newBrand);
      await logPageToGoogleSheets(newBrand)
      res.status(200).json({ message: "new Brand adding successful" });
      // console.log(1)
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  async function logPageToGoogleSheets(newBrand) {
    try {
      const response=await sheets.spreadsheets.values.append({
        spreadsheetId:process.env.GOOGLE_SHEET_ID,
        range:'Brands!A:G',
        insertDataOption:'INSERT_ROWS',
        valueInputOption:'RAW',
        requestBody:{
          values:[[newBrand.brand_name,newBrand.brand_discount,newBrand.description,newBrand.url,newBrand.meta_title,newBrand.meta_keyword,newBrand.meta_description,newBrand.AdminUser_id]]
        }
      })
    } catch (error) {
      
    }
  }
  
  exports.getBrandById = async (req, res) => {
    const id = req.params.id;
    // console.log(id)
    try {
      const result = await Brand.getById(id);
      // console.log(result.length)
      if (!result) {
        return res.status(404).json({ message: "Data not found!" });
      }
      res.status(200).json({message:"found successfully!", data: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

exports.brandCount=async (req,res)=>{
  try {
    const result=await Brand.allBrandCount();
    res.json({allBrandCount:result})
  } catch (error) {
      console.log(error)
  }
}

exports.Search=async (req,res)=>{
  const searchTerm=req.params.searchTerm
  const result=await await Brand.searchTerm(searchTerm);
  res.json(result)
}
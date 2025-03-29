const Product = require("../Models/Product");
const { cloudinary }=require("../helper/cloudinaryConfig")
const redisClient=require("../config/redisClient");
const sheets = require("../service/gSheet");
const CACHE_EXPIRY_TIME=3600; 

exports.getAllProducts = async (req, res) => {
  // console.log(1)
  try {
    const cachedProducts=await redisClient.get('allProducts')
    if(cachedProducts){
      console.log("filtering from redis cache")
      return res.json(JSON.parse(cachedProducts))
    }

    const products = await Product.Product.getAll();
    // console.log(products)
    await redisClient.setEx('allProducts',CACHE_EXPIRY_TIME,JSON.stringify(products))
    // console.log('Fetching from MySQL and storing in Redis cache...');

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  const { category_id,brand_id, product_name, product_code,group_code, product_color, family_color, product_price,  product_discount,product_weight,final_price, discount_type, description, washcare,  fabric,keywords,  pattern,  sleeve,  fit,occassion,meta_title,    meta_description,meta_keywords,    is_featured }=req.body;
  const product_video = req.files['product_video'] ? req.files['product_video'][0].filename : null;
  const product_images = req.files['product_image'] ? req.files['product_image'] : [];
  const is_featured_val = is_featured === 'true' ? 'Yes' : 'No';
  const productData={category_id,brand_id, product_name,product_video,product_images, product_code,group_code, product_color, family_color, product_price,  product_discount,product_weight,final_price, discount_type, description, washcare,  fabric,keywords,  pattern,  sleeve,  fit,occassion,meta_title,    meta_description,meta_keywords,    is_featured_val}
  
  try {
    await Product.Product.updateById(id, productData);
    // console.log(1)
    res.status(200).json({ message: "Updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getProductById = async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  try {
    const product = await Product.Product.getById(id);
    if (!product) {
      return res.status(404).json({ message: "Data not found!" });
    }
    const data = { ...product, product_video: `http://localhost:8081/uploads/products/${product.product_video}` };
    res.status(200).json({ message: "Data fetched!", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.deleteById(id);
    res.status(200).json({ message: "Data deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateProductStatus = async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  const { status } = req.body;
  // console.log(status)
  try {
    await Product.Product.toggleStatusById(id, status);
    res.status(200).json({ message: "Status updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getProductColors = async (req, res) => {
  try {
    const colors = await Product.Product.getColors();
    res.json(colors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getProductCount = async (req, res) => {
  try {
    const productCount = await Product.Product.getTotalCount();
    res.json({ productcount: productCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getProductImages = async (req, res) => {
  try {
    const images = await Product.Product.getImages();
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateImageStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    await Product.Product.updateImageStatus(id, status);
    res.status(200).json({ message: "Status updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteImage = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.Product.deleteImageById(id);
    res.status(200).json({ message: "Data deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.handleproductImagesstatus=async(req,res)=>{
  const id = req.params.id;
  const { status }=req.body;
  // console.log(id)
  try {
    await Product.Product.imageStatus(id,status);
    res.status(200).json({ message: "image status successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.editproductattributes=async(req,res)=>{
  const id = req.params.id;
  try {
    const result=await Product.Product.ProductAttributeById(id);
    res.status(200).json({ message: "found successfully!",result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.ProductAttributesStatusChange=async(req,res)=>{
  const id = req.params.id;
  const { status } = req.body; // Extract status from the request body
  try {
    await Product.ProductAttributeByIdStatusChange(id,status);
    res.status(200).json({ message: "status updated successfully!" });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Internal Server Error" });
  }
}
exports.deleteattribute=async(req,res)=>{
  const id = req.params.id;
  // console.log(id)
  try {
    await Product.DeleteAttributeById(id);
    // console.log(1)
    res.status(200).json({ message: "attribute deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.allproductsAttributes=async(req,res)=>{  
  // console.log(1)
  try {
    const result=await Product.Product.getAllProductsAttribute();
    // console.log(1)
    res.status(200).json({ message: "attribute get successfully!" ,result});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.SearchProduct = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    console.log(searchTerm);
    const result = await Product.Product.searchProducts(searchTerm);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.addProduct = async (req, res) => {
  try {
    const {AdminUser_id, category_id, brand_id, product_name, product_code, product_color, family_color, group_code, product_price, product_weight, product_discount, discount_type, final_price, description, washcare, keywords, fabric, pattern, sleeve, fit, occassion, meta_title, meta_description, meta_keywords, is_featured} = req.body;
    let attributes = req.body.attribute;
    if (typeof attributes === 'string') {
      attributes = JSON.parse(attributes);
    }
    // console.log(req.body)

     const product_price_number = parseFloat(product_price);
    //  console.log(product_price_number)
     if (isNaN(product_price_number)) {
       return res.status(400).json({ message: "Invalid product price" });
     }
    // const product_video = req.files['product_video'] ? req.files['product_video'][0].filename : null;
    // const product_images = req.files['product_image'] ? req.files['product_image'] : [];
    const product_video = req.files['product_video'] ? await cloudinary.uploader.upload(req.files['product_video'][0].path,{folder:'ProductVIDEO'}): null;
    const product_images = req.files['product_image'] ? Array.isArray(req.files['product_image'].map(image=> cloudinary.uploader.upload(image.path,{folder:'ProductsIMAGE'}))) : []; 
    const is_featured_val = is_featured === 'true' ? 'Yes' : 'No';

    const product = {AdminUser_id, category_id, brand_id, product_name, product_code, product_color, family_color, group_code,  product_price_number, product_weight, product_discount, discount_type, final_price, description,  washcare, keywords, fabric, pattern, sleeve, fit, occassion, meta_title, meta_description, meta_keywords, is_featured: is_featured_val  };

    if (Array.isArray(attributes) && attributes.length > 0) {
      await Product.Products.addProduct(product, product_video, product_images,attributes);
    }
    await logPageToGoogleSheets(product)
    res.status(200).json({ message: "Product added successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

async function logPageToGoogleSheets(product) {
  try {
    const response=await sheets.spreadsheets.values.append({
      spreadsheetId:process.env.GOOGLE_SHEET_ID,
      range:'Products!A:Y',
      insertDataOption:'INSERT_ROWS',
      valueInputOption:'RAW',
      requestBody:{
        values:[[
          product.category_id,
          product.brand_id,
          product.product_name,
          product.product_code,
          product.product_color,
          product.family_color,
          product.group_code,
          product.product_price_number,
          product.product_weight,
          product.product_discount,
          product.discount_type,
          product.final_price,
          product.description,
          product.washcare,
          product.keywords,
          product.fabric,
          product.pattern,
          product.sleeve,
          product.fit,
          product.occassion,
          product.meta_title,
          product.meta_description,
          product.meta_keywords,
          product.is_featured,
          product.AdminUser_id
        ]]
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
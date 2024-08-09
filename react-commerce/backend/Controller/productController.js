const Product = require("../Models/Product");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const product_video = req.file ? req.file.filename : null;
  const productData = { ...req.body, product_video };

  try {
    await Product.updateById(id, productData);
    res.status(200).json({ message: "Updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.getById(id);
    if (!product) {
      return res.status(404).json({ message: "Data not found!" });
    }
    const data = { ...product, category_image: `http://localhost:8081/uploads/categories/${product.category_image}` };
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
  const { status } = req.body;
  try {
    await Product.toggleStatusById(id, status);
    res.status(200).json({ message: "Status updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getProductColors = async (req, res) => {
  try {
    const colors = await Product.getColors();
    res.json(colors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getProductCount = async (req, res) => {
  try {
    const productCount = await Product.getTotalCount();
    res.json({ productcount: productCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const {
      category_id, product_name, product_code, product_color, family_color, group_code,
      product_price, product_weight, product_discount, discount_type, final_price, description,
      washcare, keywords, fabric, pattern, sleeve, fit, meta_keywords, meta_description,
      meta_title, occassion, is_featured
    } = req.body;

    const product_video = req.files['product_video'] ? req.files['product_video'][0].filename : null;
    const product_images = req.files['product_image'] ? req.files['product_image'] : [];
    const is_featured_val = is_featured === 'Yes' ? 'Yes' : 'No';

    const product = {
      category_id, product_name, product_code, product_color, family_color, group_code,
      product_price, product_weight, product_discount, discount_type, final_price, product_video,
      description, washcare, keywords, fabric, pattern, sleeve, fit, meta_keywords, meta_description,
      meta_title, occassion, is_featured: is_featured_val
    };

    await Product.addProduct(product, product_images);
    res.status(200).json({ message: "Product added successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getProductImages = async (req, res) => {
  try {
    const images = await Product.getImages();
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
    await Product.updateImageStatus(id, status);
    res.status(200).json({ message: "Status updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteImage = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.deleteImageById(id);
    res.status(200).json({ message: "Data deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.handleproductImagesstatus=async(req,res)=>{
  const id = req.params.id;
  try {
    await Product.imageStatus(id);
    res.status(200).json({ message: "image status successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.editproductattributes=async(req,res)=>{
  const id = req.params.id;
  try {
    await Product.ProductAttributeById(id);
    res.status(200).json({ message: "updated successfully!" });
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
  
  try {
    await Product.DeleteAttributeById(id);
    res.status(200).json({ message: "attribute deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.allproductsAttributes=async(req,res)=>{  
  try {
    await Product.getAllProductsAttribute();
    res.status(200).json({ message: "attribute get successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

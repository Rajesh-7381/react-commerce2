const { db } = require("../config/dbconfig");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp"); //The sharp library is a popular JavaScript library for image processing in Node.js. It provides a simple and efficient API for resizing, cropping, and transforming images in a variety of formats, including JPEG, PNG, WebP, and TIFF.

const Product = {
  // Get all products with category and parent category information
  getAll: async () => {
    const query = " SELECT p.*, c.category_name AS category_name, pc.category_name AS parent_category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id LEFT JOIN categories pc ON c.parent_id = pc.id WHERE p.deleted_at IS NULL ";

    try {
      const [products] = await db.promise().query(query);
      return products.map((product) => ({
        ...product,
        category_name: product.category_name || "No Category",
        parent_category_name:
          product.parent_category_name || "No Parent Category",
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Update a product by ID
  updateById: async (id, product) => {
    const { category_id, product_name, product_code, product_color, family_color, group_code, product_price, product_weight, product_discount, discount_type, final_price, product_video, description, washcare,keywords,  fabric,  pattern,  sleeve,  fit,  meta_keywords,  meta_description,  meta_title,  occassion,  is_featured} = product;
     const query = `UPDATE products SET category_id=?, product_name=?, product_code=?, product_color=?, family_color=?,  group_code=?, product_price=?, product_weight=?, product_discount=?, discount_type=?, final_price=?, product_video=?, description=?, washcare=?, keywords=?, fabric=?, pattern=?, sleeve=?, fit=?, meta_keywords=?, meta_description=?, meta_title=?, occassion=?, is_featured=? WHERE id=? AND deleted_at IS NULL `;

    try {
      const [result] = await db.promise().query(query, [ category_id, product_name, product_code, product_color, family_color, group_code, product_price, product_weight, product_discount, discount_type, final_price, product_video, description, washcare, keywords,  fabric,  pattern,  sleeve,  fit,  meta_keywords,  meta_description,  meta_title,  occassion,  is_featured,  id,]);
      return result;
    } catch (error) {
        console.error(`Error updating product with ID ${id}:`, error);
        throw error;
    }
  },

  // Get a product by its ID
  getById: async (id) => {
    const query = "SELECT * FROM products WHERE id=? AND deleted_at IS NULL";
    try {
      const [result] = await db.promise().query(query, [id]);
      return result[0];
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },

  // Soft delete a product by its ID
  deleteById: async (id) => {
    const query = "UPDATE products SET deleted_at=CURRENT_TIMESTAMP WHERE id=?";
    try {
      const [result] = await db.promise().query(query, [id]);
      return result;
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw error;
    }
  },

  // Toggle the status of a product by its ID
  toggleStatusById: async (id, status) => {
    const query =  "UPDATE products SET status=? WHERE id=? AND deleted_at IS NULL";
    try {
      const [result] = await db.promise().query(query, [status, id]);
      return result;
    } catch (error) {
      console.error(`Error toggling status for product with ID ${id}:`, error);
      throw error;
    }
  },

  // Get all colors
  getColors: async () => {
    const query = "SELECT * FROM colors";
    try {
      const [colors] = await db.promise().query(query);
      return colors;
    } catch (error) {
      console.error("Error fetching colors:", error);
      throw error;
    }
  },

  // Get total count of products
  getTotalCount: async () => {
    const query =
      "SELECT COUNT(*) AS total FROM products WHERE deleted_at IS NULL";
    try {
      const [result] = await db.promise().query(query);
      return result[0].total;
    } catch (error) {
      console.error("Error fetching total product count:", error);
      throw error;
    }
  },

  // Get all product images
  getImages: async () => {
    const query = "SELECT * FROM products_image WHERE deleted_at IS NULL";
    try {
      const [images] = await db.promise().query(query);
      return images;
    } catch (error) {
      console.error("Error fetching product images:", error);
      throw error;
    }
  },

  // Update the status of a product image by its ID
  updateImageStatus: async (id, status) => {
    const query =
      "UPDATE products_image SET status=? WHERE id=? AND deleted_at IS NULL";
    try {
      const [result] = await db.promise().query(query, [status, id]);
      return result;
    } catch (error) {
      console.error(`Error updating image status with ID ${id}:`, error);
      throw error;
    }
  },

  // Soft delete a product image by its ID
  deleteImageById: async (id) => {
    const query =
      "UPDATE products_image SET deleted_at=CURRENT_TIMESTAMP WHERE id=?";
    try {
      const [result] = await db.promise().query(query, [id]);
      return result;
    } catch (error) {
      console.error(`Error deleting product image with ID ${id}:`, error);
      throw error;
    }
  },

    //locally delete from file
  // deleteImageById:async(id)=>{
  //   const imagegettingquery="select * from brands where id=?";
  //   const deletequery="delete from brnds where id=?"
   
  //     db.query(imagegettingquery,[id],(err,result)=>{
  //       if(err){
  //         return err;
  //       }
  //       const imageurl=result[0].image;
  //       const localydeletepath=path.join(__dirname,`../uploads/Brands/${imageurl}`)
  //       try {
  //         fs.promises.access(localydeletepath)
  //         fs.promises.unlink(localydeletepath)
  //       } catch (error) {
  //           if(error.code ==='ENOENT'){
  //             console.log("file does not exists!")
  //           }else if(error.code ==='EPERM'){
  //             console.log("operation not permited")
  //           }else{
  //             console.log("error deleting file")
  //           }
  //       }
  //     })

  //     try {
  //       const deletedata=await new Promise((resolve,reject)=>{
  //         db.query(deletequery,[id],(err,result)=>{
  //           if(err){
  //             reject(err)
  //           }else{
  //             resolve(result)
  //           }
  //         })
  //       })
  //       return deletedata;
  //     } catch (error) {
  //         throw error
  //     }
      
  // },

  // Toggle the status of a product image by its ID
  imageStatus: async (id, status) => {
    const query =
      "UPDATE products_image SET status=? WHERE id=? AND deleted_at IS NULL";
    try {
      const [result] = await db.promise().query(query, [status, id]);
      return result;
    } catch (error) {
      console.error(`Error toggling image status with ID ${id}:`, error);
      throw error;
    }
  },

  // Get all attributes of a product by product ID
  ProductAttributeById: async (id) => {
    console.log(id)
    const query =
      "SELECT * FROM product_attributes WHERE id=? AND deleted_at IS NULL";
    try {
      const [attributes] = await db.promise().query(query, [id]);
      // console.log(attributes)
      return attributes;
    } catch (error) {
      console.error(
        `Error fetching product attributes with product ID ${id}:`,
        error
      );
      throw error;
    }
  },

  // Toggle the status of a product attribute by product ID
  ProductAttributeByIdStatusChange: async (id, status) => {
    const query =
      "UPDATE product_attributes SET status=? WHERE product_id=? AND deleted_at IS NULL";
    try {
      const [result] = await db.promise().query(query, [status, id]);
      return result;
    } catch (error) {
      console.error(
        `Error toggling product attribute status with product ID ${id}:`,
        error
      );
      throw error;
    }
  },

  // Soft delete a product attribute by its ID
  DeleteAttributeById: async (id) => {
    const query =
      "UPDATE product_attributes SET deleted_at=CURRENT_TIMESTAMP WHERE id=?";
    try {
      const [result] = await db.promise().query(query, [id]);
      return result;
    } catch (error) {
      console.error(`Error deleting product attribute with ID ${id}:`, error);
      throw error;
    }
  },

  // Get all product attributes
  getAllProductsAttribute: async () => {
    const query = "SELECT * FROM product_attributes WHERE deleted_at IS NULL";
    try {
      const [attributes] = await db.promise().query(query);
      return attributes;
    } catch (error) {
      console.error("Error fetching all product attributes:", error);
      throw error;
    }
  },

  // search products
  searchProducts: async (searchTerm) => {
    console.log(searchTerm);
    const query = "SELECT * FROM products WHERE product_name LIKE ? AND deleted_at IS NULL";
  
    try {
      const [result] = await db.promise().query(query, [`%${searchTerm}%`]);
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error fetching all product attributes:", error);
      throw error;
    }
  }
};

const Products = {
  addProduct: async (product, product_video, product_images, attributes) => {
    const { AdminUser_id, category_id, brand_id, product_name, product_code, product_color, family_color, group_code,  product_price, product_weight, product_discount, discount_type, final_price, description,  washcare, keywords, fabric, pattern, sleeve, fit, occassion, meta_title, meta_description, meta_keywords, is_featured} = product;

    const query = `INSERT INTO products (AdminUser_id,category_id, brand_id, product_name, product_code, product_color, family_color,   group_code, product_price, product_weight, product_discount, discount_type, final_price,   product_video, description, washcare, keywords, fabric, pattern, sleeve, fit, meta_keywords,   meta_description, meta_title, occassion, is_featured)    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?) `;

    try {
      const [result] = await db.promise().query(query, [AdminUser_id, category_id, brand_id, product_name, product_code, product_color, family_color, group_code,   product_price, product_weight, product_discount, discount_type, final_price, product_video,   description, washcare, keywords, fabric, pattern, sleeve, fit, meta_keywords, meta_description,   meta_title, occassion, is_featured ]);

      const productId = result.insertId;

      if (product_images.length > 0) {
        const outputDirs = {
          large: path.join(__dirname, "../uploads/productImages/large"),
          medium: path.join(__dirname, "../uploads/productImages/medium"),
          small: path.join(__dirname, "../uploads/productImages/small"),
        };

        const resolutions = {
          large: { width: 1280, height: 760 },
          medium: { width: 760, height: 480 },
          small: { width: 480, height: 320 },
        };

        // Ensure directories exist
        for (const [key, dir] of Object.entries(outputDirs)) {
          if (!fs.existsSync(dir)) {
            console.log(`Creating directory: ${dir}`);
            fs.mkdirSync(dir, { recursive: true });
          }
        }

        // Process and save the images in different resolutions
        await Promise.all(
          product_images.map(async (file) => {
            await Promise.all(
              Object.entries(resolutions).map(
                async ([key, { width, height }]) => {
                  const outputPath = path.join(outputDirs[key],file.filename );
                  // console.log(`Processing image: ${outputPath}`);//path check

                  try {
                    // the faster image is webp according google
                    await sharp(file.path).webp({quality:80}).resize(width, height).toFile(outputPath);
                  } catch (error) {
                        console.error(`Failed to process image: ${outputPath}`, error);
                        throw error;
                  }
                }
              )
            );
          })
        );

        await Products.addProductImages(productId, product_images);
      }

      await Products.addProductAttributes(productId, attributes);
      return productId;
    } catch (error) {
        console.error("Error adding new product:", error);
        throw error;
    }
  },

  addProductImages: async (productId, product_images) => {
    const imageQuery = ` INSERT INTO products_image (AdminUser_id,product_id, image, image_sort)  VALUES ? `;

    const imageValues = product_images.map((file, index) => [
      productId, file.filename, index + 1,
    ]);

    await db.promise().query(imageQuery, [imageValues]);
  },

  addProductAttributes: async (productId, attributes) => {
    const attributesQuery = ` INSERT INTO product_attributes (AdminUser_id,product_id, size, sku, price, stock)  VALUES ? `;
    const attributeValues = attributes.map(attribute => [
      productId, attribute.size, attribute.sku, attribute.price, attribute.stock,
    ]);

    await db.promise().query(attributesQuery, [attributeValues]);
  },
};

module.exports = {Product,Products};
const db = require("../config/dbconfig");

const Product = {
  getAll: () => {
    const query = `
      SELECT p.*, c.category_name AS category_name, pc.category_name AS parent_category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN categories pc ON c.parent_id = pc.id
      WHERE p.deleted_at IS NULL`;

    return new Promise((resolve, reject) => {
      db.query(query, (err, data) => {
        if (err) {
          return reject(err);
        }
        const products = data.map((product) => ({
          ...product,
          category_name: product.category_name || "No Category",
          parent_category_name: product.parent_category_name || "No Parent Category",
        }));
        resolve(products);
      });
    });
  },

  updateById: (id, product) => {
    const {
      category_id, product_name, product_code, product_color, family_color, group_code,
      product_price, product_weight, product_discount, discount_type, final_price, product_video,
      description, washcare, keywords, fabric, pattern, sleeve, fit,
      meta_keywords, meta_description, meta_title, occassion, is_featured
    } = product;

    const query = `
      UPDATE products SET category_id=?, product_name=?, product_code=?, product_color=?, 
      family_color=?, group_code=?, product_price=?, product_weight=?, product_discount=?, 
      discount_type=?, final_price=?, product_video=?, description=?, washcare=?, keywords=?, 
      fabric=?, pattern=?, sleeve=?, fit=?, meta_keywords=?, meta_description=?, meta_title=?, 
      occassion=?, is_featured=? WHERE id=?`;

    return new Promise((resolve, reject) => {
      db.query(query, [
        category_id, product_name, product_code, product_color, family_color, group_code,
        product_price, product_weight, product_discount, discount_type, final_price, product_video,
        description, washcare, keywords, fabric, pattern, sleeve, fit,
        meta_keywords, meta_description, meta_title, occassion, is_featured, id
      ], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  getById: (id) => {
    const query = "SELECT * FROM products WHERE id=?";
    return new Promise((resolve, reject) => {
      db.query(query, id, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result[0]);
      });
    });
  },

  deleteById: (id) => {
    const query = "UPDATE products SET deleted_at=CURRENT_TIMESTAMP WHERE id=?";
    return new Promise((resolve, reject) => {
      db.query(query, id, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  toggleStatusById: (id, status) => {
    const query = "UPDATE products SET status=? WHERE id=?";
    return new Promise((resolve, reject) => {
      db.query(query, [status, id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  getColors: () => {
    const query = "SELECT * FROM colors";
    return new Promise((resolve, reject) => {
      db.query(query, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  },

  getTotalCount: () => {
    const query = "SELECT COUNT(*) AS total FROM products WHERE deleted_at IS NULL";
    return new Promise((resolve, reject) => {
      db.query(query, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data[0].total);
      });
    });
  },

  addProduct: (product, images) => {
    const {
      category_id, product_name, product_code, product_color, family_color, group_code,
      product_price, product_weight, product_discount, discount_type, final_price, product_video,
      description, washcare, keywords, fabric, pattern, sleeve, fit,
      meta_keywords, meta_description, meta_title, occassion, is_featured
    } = product;

    const query = `
      INSERT INTO products (category_id, product_name, product_code, product_color, family_color,
      group_code, product_price, product_weight, product_discount, discount_type, final_price,
      product_video, description, washcare, keywords, fabric, pattern, sleeve, fit, meta_keywords,
      meta_description, meta_title, occassion, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
      db.query(query, [
        category_id, product_name, product_code, product_color, family_color, group_code,
        product_price, product_weight, product_discount, discount_type, final_price, product_video,
        description, washcare, keywords, fabric, pattern, sleeve, fit,
        meta_keywords, meta_description, meta_title, occassion, is_featured
      ], (err, result) => {
        if (err) {
          return reject(err);
        }
        const productId = result.insertId;
        if (images.length > 0) {
          const imageValues = images.map((file, index) => [productId, file.filename, index + 1]);
          const imagesQuery = "INSERT INTO products_image (product_id, image, image_sort) VALUES ?";
          db.query(imagesQuery, [imageValues], (err, data) => {
            if (err) {
              return reject(err);
            }
            resolve(result);
          });
        } else {
          resolve(result);
        }
      });
    });
  },

  getImages: () => {
    const query = "SELECT * FROM products_image WHERE deleted_at IS NULL";
    return new Promise((resolve, reject) => {
      db.query(query, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  },

  updateImageStatus: (id, status) => {
    const query = "UPDATE products_image SET status=? WHERE id=?";
    return new Promise((resolve, reject) => {
      db.query(query, [status, id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  deleteImageById: (id) => {
    const query = "UPDATE products_image SET deleted_at=CURRENT_TIMESTAMP WHERE id=?";
    return new Promise((resolve, reject) => {
      db.query(query, id, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }
};

module.exports = Product;

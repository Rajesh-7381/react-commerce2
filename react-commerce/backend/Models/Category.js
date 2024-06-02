const db = require("../config/dbconfig");

const Category = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM categories WHERE deleted_at IS NULL";
      db.query(query, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  },
  add: (category) => {
    const {
      category_name,
      parent_id,
      category_image,
      category_discount,
      description,
      url,
      meta_title,
      meta_description,
      meta_keyword,
    } = category;
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO categories (category_name, parent_id, category_image, category_discount, description, url, meta_title, meta_description, meta_keyword) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(
        query,
        [
          category_name,
          parent_id,
          category_image,
          category_discount,
          description,
          url,
          meta_title,
          meta_description,
          meta_keyword,
        ],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM categories WHERE id=?";
      db.query(query, [id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },
  update: (id, category) => {
    const {
      category_name,
      parent_id,
      category_image,
      category_discount,
      description,
      url,
      meta_title,
      meta_description,
      meta_keyword,
    } = category;
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE categories SET category_name=?, parent_id=?, category_image=?, category_discount=?, description=?, url=?, meta_title=?, meta_description=?, meta_keyword=? WHERE id=?";
      db.query(
        query,
        [
          category_name,
          parent_id,
          category_image,
          category_discount,
          description,
          url,
          meta_title,
          meta_description,
          meta_keyword,
          id,
        ],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE categories SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?";
      db.query(query, [id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  updateStatus: (id, status) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE categories SET status = ? WHERE id = ?";
      db.query(query, [status, id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  countDistinct: () => {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT COUNT(DISTINCT category_name) AS total FROM categories";
      db.query(query, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data[0].total);
      });
    });
  },

  getAllIds: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT id FROM categories WHERE deleted_at IS NULL";
      db.query(query, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  },

  getParentCategory: (parentId) => {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT category_name FROM categories WHERE id = ? AND deleted_at IS NULL";
      db.query(query, [parentId], (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data[0]);
      });
    });
  },
};

module.exports=Category;
const { db }=require("../config/dbconfig");

const Banner = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Banners WHERE deleted_at IS NULL";
      db.query(query, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  },

  updateStatus: (id, status) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE Banners SET status=? WHERE id=?";
      db.query(query, [status, id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE Banners SET deleted_at=CURRENT_TIMESTAMP WHERE id=?";
      db.query(query, [id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  update: (id, page) => {
    const { title, url, description, meta_title, meta_keywords, meta_description } = page;
    return new Promise((resolve, reject) => {
      const query = "UPDATE Banners SET title=?, url=?, description=?, meta_title=?, meta_keywords=?, meta_description=? WHERE id=?";
      db.query(query, [title, url, description, meta_title, meta_keywords, meta_description, id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  add: (page) => {
    const { title, url, description, meta_title, meta_keywords, meta_description } = page;
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO Banners (title, url, description, meta_title, meta_keywords, meta_description) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(query, [title, url, description, meta_title, meta_keywords, meta_description], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Banners WHERE id=?";
      db.query(query, [id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }
};

module.exports = Banner;

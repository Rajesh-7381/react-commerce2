const db = require("../config/dbconfig");

const User = {
  create: ({ name, mobile, email, hashedPassword, image }) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO AdminUser (name, mobile, email, password, image) VALUES (?, ?, ?, ?, ?)";
      db.query(query, [name, mobile, email, hashedPassword, image], (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM AdminUser WHERE email = ?";
      db.query(query, [email], (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
};

module.exports = User;

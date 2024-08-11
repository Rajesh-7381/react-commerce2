const { db }=require("../config/dbconfig")
const { v4:uuidv4 }=require("uuid")
const UUID=uuidv4();

const Front = {
    contactForm: (name, email, subject, message) => {
      const query = "INSERT INTO ContactUS (UUID,name, email, subject, message) VALUES (?, ?, ?, ?, ?)";
      return new Promise((resolve, reject) => {
        db.query(query, [UUID,name, email, subject, message], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    },
  };
module.exports=Front
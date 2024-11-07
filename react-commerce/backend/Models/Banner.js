const { db } = require("../config/dbconfig");
const { v4: uuidv4 } = require("uuid");
const { cloudinary } = require("../helper/cloudinaryConfig");
const fs = require('fs');
const path = require('path');

const Banner = {
  // Fetch all active banners (non-deleted)
  getAll: async () => {
    const query = "SELECT * FROM Banners WHERE deleted_at IS NULL";
    try {
      const [rows] = await db.promise().query(query);
      return rows;
    } catch (error) {
      console.error("Error fetching banners:", error);
      throw error;
    }
  },

  // Update banner status by ID
  updateStatus: async (id, status) => {
    const query = "UPDATE Banners SET status = ? WHERE id = ?";
    try {
      const [result] = await db.promise().query(query, [status, id]);
      return result;
    } catch (error) {
      console.error(`Error updating status for banner with ID ${id}:`, error);
      throw error;
    }
  },

  // this way we can delete data from cloudinary
  delete: async (id) => {
    // console.log(1)
    const query = "DELET FROM Banners  WHERE id = ?";
    const publicId=await getPublicId(id);
    await cloudinary.uploader.destroy(publicId) // to remove cloudinary
    try {
      const [result] = await db.promise().query(query, [id]);
      return result;
    } catch (error) {
      console.error(`Error deleting banner with ID ${id}:`, error);
        throw error;
    }
  },

  // locally delete from file
  // delete: async (id) => {
  //   // console.log(id)
  //   const imageGettingQuery = "select image from banners where id=?";
  //   const deleteQuery = "delete from banners where id=?";
  //   db.query(imageGettingQuery, [id], (err, rows) => {
  //     if (err) {
  //       console.log(err)
  //     }
  //     const imageurl = rows[0].image;
  //     console.log(imageurl)
  //     const locallydeltepath = path.join(__dirname, `../uploads/banners/${imageurl}`)
  //     console.log(locallydeltepath)
  //     try {
  //        fs.promises.access(locallydeltepath); 
  //        fs.promises.unlink(locallydeltepath); 
  //     } catch (fileerror) {
  //       if (fileerror.code === 'ENOENT') {
  //         console.log("file does not exists!")
  //       } else if (fileerror.code === 'EPERM') {
  //         console.log("operation not permited")
  //       } else {
  //         console.log("error deleteing file")
  //       }
  //     }
  //   })
  
  //   try {
  //     const deleteResult = await new Promise((resolve, reject) => {
  //       db.query(deleteQuery, [id], (err, result) => {
  //         if (err) {
  //           reject(err)
  //         } else {
  //           resolve(result)
  //         }
  //       })
  //     })
  //     return deleteResult;
  //   } catch (error) {
      
  //   }
  // },

  // Update banner details by ID
  update: async (id, page) => {
    const { url, description, meta_title, meta_keywords, meta_description } = page;
    const query = ` UPDATE Banners  SET    url = ?,    description = ?,    meta_title = ?,    meta_keywords = ?,    meta_description = ?  WHERE id = ?`;
    try {
      const [result] = await db.promise().query(query, [url, description, meta_title, meta_keywords, meta_description, id]);
      return result;
    } catch (error) {
      console.error(`Error updating banner with ID ${id}:`, error);
      throw error;
    }
  },

  // Add a new banner
  add: async (page) => {
    const {AdminUser_id, image, type, link, alt } = page;
    // console.log(page)
    const query = `INSERT INTO Banners (AdminUser_id,UUID, image, type, link, alt)  VALUES (?, ?, ?, ?, ?,?)`;
    const UUID = uuidv4();

    try {
      const [result] = await db.promise().query(query, [AdminUser_id,UUID , image ? image.secure_url : null, type, link, alt]);
      // console.log(result)
      return result;
    } catch (error) {
      console.error("Error adding new banner:", error);
      throw error;
    }
  },

  // Get a single banner by ID
  getById: async (id) => {
    const query = "SELECT * FROM Banners WHERE id = ?";
    try {
      const [rows] = await db.promise().query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error fetching banner with ID ${id}:`, error);
      throw error;
    }
  }
};

async function getPublicId(id) {
  const query = "select PublicId from banners where id=?";
  try {
    const [result] = await db.promise().query(query, [id]);
    return result[0].PublicId;
  } catch (error) {
    console.log(error);
    return null; // or throw error, depending on your requirements
  }
}
module.exports = Banner;

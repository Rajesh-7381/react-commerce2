const { db } = require("../config/dbconfig");
const { v4: uuidv4 } = require('uuid');
const UUID=uuidv4()
const path=require("path")
const fs=require("fs")

const Brand = {
  // Fetch all non-deleted brands
  getAll: async () => {
    const query = "SELECT * FROM Brands WHERE deleted_at IS NULL";
    try {
      const [rows] = await db.promise().query(query);
      return rows;
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  },

  // Update the status of a brand by ID
  updateStatus: async (id, status) => {
    const query = "UPDATE Brands SET status = ? WHERE id = ? AND deleted_at IS NULL";
    try {
      const [result] = await db.promise().query(query, [status, id]);
      return result;
    } catch (error) {
      console.error(`Error updating status for brand with ID ${id}:`, error);
      throw error;
    }
  },

  // Soft delete a brand by ID
  delete: async (id) => {
    const query = "UPDATE Brands SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL";
    try {
      const [result] = await db.promise().query(query, [id]);
      return result;
    } catch (error) {
      console.error(`Error deleting brand with ID ${id}:`, error);
      throw error;
    }
  },

  //locally delete from file
  // delete:async(id)=>{
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

  // Update brand details by ID
  update: async (id, page) => {
    const { brand_name, brand_discount, description,url, meta_title, meta_keywords, meta_description,brand_image, brand_logo } = page;
    // console.log(page)
    const query = ` UPDATE Brands  SET    brand_name = ?,    brand_discount = ?,    description = ?,    url = ?,    meta_title = ?,    meta_keywords = ?,    meta_descriptions = ? ,   brand_image = ? ,   brand_logo = ?  WHERE id = ? AND deleted_at IS NULL`;

    try {
      const [result] = await db.promise().query(query, [ brand_name, brand_discount, description,url, meta_title, meta_keywords, meta_description,brand_image,brand_logo,  id]);
      return result;
    } catch (error) {
      console.error(`Error updating brand with ID ${id}:`, error);
      throw error;
    }
  },

  // Add a new brand
  add: async (page) => {
    const {AdminUser_id, brand_name, brand_image, brand_logo,brand_discount,description,url, meta_title, meta_description,meta_keyword } = page;
    // console.log(page)
    const query = `INSERT INTO Brands (AdminUser_id,UUID,brand_name, brand_image, brand_logo,brand_discount,description,url, meta_title, meta_descriptions,meta_keywords) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
    try {
      const [result] = await db.promise().query(query, [AdminUser_id,UUID,brand_name, brand_image ? brand_image.secure_url : null, brand_logo ? brand_logo.secure_url : null,brand_discount,description,url, meta_title, meta_description, meta_keyword]);
      // console.log(result)
      return result;
    } catch (error) {
      console.error("Error adding new brand:", error);
      throw error;
    }
  },

  // Get brand details by ID
  getById: async (id) => {
    const query = "SELECT * FROM Brands WHERE id = ? AND deleted_at IS NULL";
    try {
      const [rows] = await db.promise().query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error fetching brand with ID ${id}:`, error);
      throw error;
    }
  },

  // Get the total count of non-deleted brands
  allBrandCount: async () => {
    const query = "SELECT COUNT(*) as total FROM Brands WHERE deleted_at IS NULL";
    try {
      const [rows] = await db.promise().query(query);
      return rows[0].total;
    } catch (error) {
      console.error("Error counting brands:", error);
      throw error;
    }
  },

  // Search for brands by a search term
  searchTerm: async (searchTerm) => {
    const searchLowerCase = searchTerm.toLowerCase();
    // console.log(searchLowerCase)
    const query = "SELECT * FROM Brands WHERE LOWER(brand_name) LIKE ? AND deleted_at IS NULL";
    try {
      const [results] = await db.promise().query(query, [`%${searchLowerCase}%`]);
      console.log(results)
      // return results;
    } catch (error) {
      console.error("Error searching for brands:", error);
      throw error;
    }
  }
};

module.exports = Brand;

const { db } = require("../config/dbconfig");

const Category = {
  // Fetch all non-deleted categories
  getAll: async () => {
    const query = "SELECT * FROM categories WHERE deleted_at IS NULL";
    try {
      const [rows] = await db.promise().query(query);
      return rows;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Add a new category
  add: async (category) => {
    const {AdminUser_id,category_name,parent_id,category_image,category_discount,description,url,meta_title,meta_description,meta_keywords} = category;

    const query = `INSERT INTO categories (AdminUser_id,category_name, parent_id, category_image, category_discount,  description, url, meta_title, meta_description, meta_keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
    try {
      const [result] = await db.promise().query(query, [AdminUser_id,category_name,parent_id,category_image ? category_image.secure_url : null,category_discount,description,url,meta_title,meta_description,meta_keywords ]);
      // console.log(result)
      return result;
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  },

  // Get a category by its ID
  getById: async (id) => {
    const query = "SELECT * FROM categories WHERE id=? AND deleted_at IS NULL";
    try {
      const [rows] = await db.promise().query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error fetching category with ID ${id}:`, error);
      throw error;
    }
  },

  // Update category details by ID
  update: async (id, category) => {
    const {category_name, parent_id, category_image, category_discount, description, url, meta_title, meta_description, meta_keyword } = category;
    const query = ` UPDATE categories SET   category_name = ?, parent_id = ?, category_image = ?, category_discount = ?, description = ?, url = ?, meta_title = ?, meta_description = ?, meta_keyword = ? WHERE id = ? AND deleted_at IS NULL `;

    try {
      const [result] = await db.promise().query(query, [ category_name, parent_id,  category_image,  category_discount,  description,  url,  meta_title,  meta_description,  meta_keyword,  id,]);
      return result;
    } catch (error) {
      console.error(`Error updating category with ID ${id}:`, error);
      throw error;
    }
  },

  // Soft delete a category by ID
  delete: async (id) => {
    const query = "UPDATE categories SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL";
    try {
      const [result] = await db.promise().query(query, [id]);
      return result;
    } catch (error) {
      console.error(`Error deleting category with ID ${id}:`, error);
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

  // Update the status of a category by ID
  updateStatus: async (id, status) => {
    const query = "UPDATE categories SET status = ? WHERE id = ? AND deleted_at IS NULL";
    try {
      const [result] = await db.promise().query(query, [status, id]);
      return result;
    } catch (error) {
      console.error(`Error updating status for category with ID ${id}:`, error);
      throw error;
    }
  },

  // Get the count of distinct category names
  countDistinct: async () => {
    const query = "SELECT COUNT(DISTINCT category_name) AS total FROM categories WHERE deleted_at IS NULL";
    try {
      const [rows] = await db.promise().query(query);
      return rows[0].total;
    } catch (error) {
      console.error("Error counting distinct categories:", error);
      throw error;
    }
  },

  // Fetch all category IDs and names
  getAllIdWithNames: async () => {
    const query = "SELECT id, category_name FROM categories WHERE deleted_at IS NULL";
    try {
      const [rows] = await db.promise().query(query);
      return rows;
    } catch (error) {
      console.error("Error fetching category IDs and names:", error);
      throw error;
    }
  },

  // Get the parent category name by parent ID
  getParentCategory: async (parentId) => {
    const query = "SELECT category_name FROM categories WHERE id = ? AND deleted_at IS NULL";
    try {
      const [rows] = await db.promise().query(query, [parentId]);
      return rows[0];
    } catch (error) {
      console.error(`Error fetching parent category with ID ${parentId}:`, error);
      throw error;
    }
  },
};

module.exports = Category;

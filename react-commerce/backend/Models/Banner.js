const { db } = require("../config/dbconfig");
const { v4: uuidv4 } = require("uuid");

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

  // Soft delete a banner by setting deleted_at
  delete: async (id) => {
    const query = "UPDATE Banners SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?";
    try {
      const [result] = await db.promise().query(query, [id]);
      return result;
    } catch (error) {
      console.error(`Error deleting banner with ID ${id}:`, error);
      throw error;
    }
  },

  // Update banner details by ID
  update: async (id, page) => {
    const { url, description, meta_title, meta_keywords, meta_description } = page;
    const query = `
      UPDATE Banners 
      SET 
        url = ?, 
        description = ?, 
        meta_title = ?, 
        meta_keywords = ?, 
        meta_description = ? 
      WHERE id = ?`;

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
    const { image, type, link, alt } = page;
    const query = `INSERT INTO Banners (UUID, image, type, link, alt)  VALUES (?, ?, ?, ?, ?)`;
    const UUID = uuidv4();

    try {
      const [result] = await db.promise().query(query, [UUID, image, type, link, alt]);
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

module.exports = Banner;

const { db } = require("../config/dbconfig");
const { v4: uuidv4 } = require("uuid");

const CmsPage = {
  // Fetch all non-deleted CMS pages
  getAll: async () => {
    const query = "SELECT * FROM cmspages WHERE deleted_at IS NULL";
    try {
      const [rows] = await db.promise().query(query);
      return rows;
    } catch (error) {
      console.error("Error fetching CMS pages:", error);
      throw error;
    }
  },

  // Update the status of a CMS page by ID
  updateStatus: async (id, status) => {
    const query = "UPDATE cmspages SET status=? WHERE id=? AND deleted_at IS NULL";
    try {
      const [result] = await db.promise().query(query, [status, id]);
      return result;
    } catch (error) {
      console.error(`Error updating status for CMS page with ID ${id}:`, error);
      throw error;
    }
  },

  // Soft delete a CMS page by ID
  delete: async (id) => {
    const query = "UPDATE cmspages SET deleted_at=CURRENT_TIMESTAMP WHERE id=?";
    try {
      const [result] = await db.promise().query(query, [id]);
      return result;
    } catch (error) {
      console.error(`Error deleting CMS page with ID ${id}:`, error);
      throw error;
    }
  },

  // Update CMS page details by ID
  update: async (id, page) => {
    const {
      title,
      url,
      description,
      meta_title,
      meta_keywords,
      meta_description,
    } = page;

    const query = `
      UPDATE cmspages SET 
        title=?, url=?, description=?, 
        meta_title=?, meta_keywords=?, meta_description=? 
      WHERE id=? AND deleted_at IS NULL
    `;

    try {
      const [result] = await db.promise().query(query, [
        title,
        url,
        description,
        meta_title,
        meta_keywords,
        meta_description,
        id,
      ]);
      return result;
    } catch (error) {
      console.error(`Error updating CMS page with ID ${id}:`, error);
      throw error;
    }
  },

  // Add a new CMS page
  add: async (page) => {
    const uuid = uuidv4();
    const {
      title,
      url,
      description,
      meta_title,
      meta_keywords,
      meta_description,
    } = page;

    const query = `
      INSERT INTO cmspages (
        uuid, title, url, description, 
        meta_title, meta_keywords, meta_description
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    try {
      const [result] = await db.promise().query(query, [
        uuid,
        title,
        url,
        description,
        meta_title,
        meta_keywords,
        meta_description,
      ]);
      return result;
    } catch (error) {
      console.error("Error adding new CMS page:", error);
      throw error;
    }
  },

  // Get a CMS page by its ID
  getById: async (id) => {
    const query = "SELECT * FROM cmspages WHERE id=? AND deleted_at IS NULL";
    try {
      const [rows] = await db.promise().query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error fetching CMS page with ID ${id}:`, error);
      throw error;
    }
  },

  // Search for CMS pages by title or URL
  searchTerm: async (searchTerm) => {
    const query = "SELECT * FROM cmspages WHERE title LIKE ? OR url LIKE ? AND deleted_at IS NULL";
    const searchPattern = `%${searchTerm}%`;

    try {
      const [rows] = await db.promise().query(query, [searchPattern, searchPattern]);
      return rows;
    } catch (error) {
      console.error("Error searching CMS pages:", error);
      throw error;
    }
  },
};

module.exports = CmsPage;

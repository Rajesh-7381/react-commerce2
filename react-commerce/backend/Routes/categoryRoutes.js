const express = require("express");
const router = express.Router();

const categoryController=require("../Controller/categoryController");
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve all categories
 *     description: Retrieve a list of all categories
 *     responses:
 *       '200':
 *         description: ✅ A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Category ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Category name
 *                     example: "Electronics"
 *                   category_image:
 *                     type: string
 *                     description: Category name
 *                     format: binary
 *                     example: "category2.png"
 *                   category_discount:
 *                     type: float
 *                     description: Category discount
 *                     example: "20"
 *                   description:
 *                     type: float
 *                     description: Category description
 *                     example: "well category"
 *                   url:
 *                     type: float
 *                     description: Category url
 *                     example: "url"
 *                   meta_title:
 *                     type: float
 *                     description: Category meta_title
 *                     example: "meta_title"
 *                   meta_description:
 *                     type: float
 *                     description: Category meta_description
 *                     example: "meta_description"
 *                   meta_keyword:
 *                     type: float
 *                     description: Category meta_keyword
 *                     example: "meta_description"
 *       '500':
 *         description: 🚫 Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/categories/add:
 *   post:
 *     summary: Add a new category
 *     description: Add a new category to the list
 *     consumes: 
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:    
 *               - parent_id    
 *               - category_name    
 *               - category_image    
 *               - category_discount    
 *               - description    
 *               - url    
 *               - meta_title    
 *               - meta_description    
 *               - meta_keyword    
 *             properties:    
 *               parent_id:    
 *                 type: integer
 *                 example: 12
 *               category_name:    
 *                 type: string
 *                 example: "furniture"
 *               category_image:    
 *                 type: string
 *                 format: binary
 *                 example: "furniture.jpg"
 *               category_discount:    
 *                 type: float
 *                 example: 10
 *               description:    
 *                 type: string
 *                 example: "good category"
 *               url:    
 *                 type: string
 *                 example: "https://github.com/Rajesh-7381/react-commerce2"
 *               meta_title:    
 *                 type: string
 *                 example: "meta title"
 *               meta_description:    
 *                 type: string
 *                 example: "meta description"
 *               meta_keyword:    
 *                 type: string
 *                 example: "meta keyword"
 *     responses:
 *       '201':
 *         description: Category added successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: 🚫 Internal server error
 */


/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Retrieve a category by ID
 *     description: Retrieve a specific category by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: ✅ A single category found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the category.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The name of the category.
 *                   example: "Electronics"
 *                 category_image:
 *                   type: string
 *                   format: binary
 *                   description: The image associated with the category.
 *                   example: "furniture.jpg"
 *                 category_discount:
 *                   type: number
 *                   format: float
 *                   description: The discount percentage for the category.
 *                   example: 10
 *                 description:
 *                   type: string
 *                   description: A description of the category.
 *                   example: "A brief description of the category."
 *                 url:
 *                   type: string
 *                   format: uri
 *                   description: The URL associated with the category.
 *                   example: "https://example.com/category/electronics"
 *                 meta_title:
 *                   type: string
 *                   description: Meta title for SEO.
 *                   example: "Electronics Category"
 *                 meta_description:
 *                   type: string
 *                   description: Meta description for SEO.
 *                   example: "Best electronics in the market."
 *                 meta_keywords:
 *                   type: string
 *                   description: Meta keywords for SEO.
 *                   example: "electronics, gadgets, tech"
 *       '404':
 *         description: ❌ Category not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Category not found."
 *       '500':
 *         description: 🚫 Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error."
 */


/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     description: Update a specific category by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated category name
 *                 example: "Updated Electronics"
 *               category_image:    
 *                 type: string
 *                 format: binary
 *                 description: Updated category image
 *                 example: "furniture.jpg"
 *               category_discount:    
 *                 type: float
 *                 description: Updated category discount
 *                 example: 10
 *               description:    
 *                 type: string
 *                 example: "good category"
 *               url:    
 *                 type: string
 *                 description: Updated category url
 *                 example: "https://github.com/Rajesh-7381/react-commerce2"
 *               meta_title:    
 *                 type: string
 *                 description: Updated category meta_title
 *                 example: "meta title"
 *               meta_description:    
 *                 type: string
 *                 description: Updated category meta_description
 *                 example: "meta description"
 *               meta_keyword:    
 *                 type: string
 *                 description: Updated category meta_keyword
 *                 example: "meta keyword"
 *     responses:
 *       '200':
 *         description: ✅ Category updated successfully
 *       '400':
 *         description: 👎 Bad request
 *       '404':
 *         description: ❌ Category not found
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     description: Delete a specific category by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: ✅ Category deleted successfully
 *       '404':
 *         description: ❌ Category not found
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/categories/status/{id}:
 *   put:
 *     summary: Update category status by ID
 *     description: Update the status of a specific category by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update status
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: New status of the category
 *                 example: "active"
 *     responses:
 *       '200':
 *         description: ✅ Category status updated successfully
 *       '400':
 *         description: 👎 Bad request
 *       '404':
 *         description: ❌ Category not found
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/categories/unique:
 *   get:
 *     summary: Retrieve unique categories
 *     description: Retrieve a list of unique categories
 *     responses:
 *       '200':
 *         description: ✅ A list of unique categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Category ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Category name
 *                     example: "Unique Electronics"
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/categories/{ids}:
 *   get:
 *     summary: Retrieve categories by IDs
 *     description: Retrieve specific categories by their IDs
 *     parameters:
 *       - in: path
 *         name: ids
 *         required: true
 *         description: Comma-separated IDs of the categories to retrieve
 *         schema:
 *           type: string
 *           example: "1,2,3"
 *     responses:
 *       '200':
 *         description: ✅ A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Category ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Category name
 *                     example: "Electronics"
 *       '404':
 *         description: ❌ Categories not found
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/categories/parent/{parentId}:
 *   get:
 *     summary: Retrieve categories by parent ID
 *     description: Retrieve categories that have the specified parent ID
 *     parameters:
 *       - in: path
 *         name: parentId
 *         required: true
 *         description: ID of the parent category
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: ✅ A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Category ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Category name
 *                     example: "Electronics"
 *       '404':
 *         description: ❌ Categories not found
 *       '500':
 *         description: 🚫 Internal server error
 */

router.get("/",categoryController.categories);
router.post("/add",categoryController.addCategory);
router.get("/:id",categoryController.categoryEditData);
router.put("/:id",categoryController.updateCategory);
router.delete("/:id",categoryController.categoryDelete);
router.put("/status/:id",categoryController.updateCategoryStatus);
router.get("/unique",categoryController.uniqueCategories);
router.get("/:ids",categoryController.categories2);
router.get("/parent/:parentId",categoryController.parentCategory);

module.exports=router;
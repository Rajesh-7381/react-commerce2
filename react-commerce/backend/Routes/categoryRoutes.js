const express = require("express");
const router = express.Router();
const upload=require("../utils/multerConfig")
const categoryController=require("../Controller/categoryController");

/**
 * @swagger
 * /api/getAllCategorys:
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
 *                     description: Category image
 *                     format: binary
 *                     example: "category2.png"
 *                   category_discount:
 *                     type: number
 *                     description: Category discount
 *                     example: 20.0
 *                   description:
 *                     type: string
 *                     description: Category description
 *                     example: "well category"
 *                   url:
 *                     type: string
 *                     description: Category URL
 *                     example: "https://example.com"
 *                   meta_title:
 *                     type: string
 *                     description: Category meta title
 *                     example: "meta_title"
 *                   meta_description:
 *                     type: string
*                     description: Category meta description
 *                     example: "meta_description"
 *                   meta_keyword:
 *                     type: string
 *                     description: Category meta keyword
 *                     example: "meta_keyword"
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
 * /api/addcategory:
 *   post:
 *     summary: Add a new category
 *     description: Add a new category to the list
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object    
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
 *                 maxLength: 10
 *                 example: 10.50
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
 * /api/categoryeditdata/{id}:
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
 * /api/updatecategory/{id}:
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
 * /api/categorydelete/{id}:
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
 * /api/handlecategorystatus/{id}:
 *   put:
 *     summary: Update category status by ID
 *     description: Update the status of a specific category by its ID (provide only 1 or 0 , 1means active 0 means inactive)
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
 *                 example: 1
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
 * /api/uniquecategories:
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
 * /api/categories:
 *   get:
 *     summary: Retrieve all categories with ID and name
 *     description: Retrieve a list of all categories with their ID and name
 *     responses:
 *       '200':
 *         description: A list of categories
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
 *                   category_name:
 *                     type: string
 *                     description: Category name
 *                     example: "Electronics"
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/parentcategory/{parentId}:
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

router.get("/getAllCategorys",categoryController.getAll);
router.post("/addcategory",upload.single("category_image"),categoryController.create);
router.get("/categoryeditdata/:id",categoryController.categoryEditData);
router.put("/updatecategory/:id",categoryController.updateCategory);
router.delete("/categorydelete/:id",categoryController.categoryDelete);
router.put("/handlecategorystatus/:id",categoryController.updateCategoryStatus);
router.get("/uniquecategories",categoryController.uniqueCategories);
router.get("/categories",categoryController.categories2);
router.get("/parentcategory/:parentId",categoryController.parentCategory);
router.get("/SearchCategories/:searchTerm");

module.exports=router;
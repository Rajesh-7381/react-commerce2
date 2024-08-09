const express=require("express");
const router=express.Router();
const upload=require("../utils/multerConfig");

/**
 * @swagger
 * /api/getAllBrands:
 *   get:
 *     summary: Retrieve all Brands
 *     description: Retrieve a list of all Brands
 *     responses:
 *       '200':
 *         description: ✅ A list of Brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Brands ID
 *                     example: 1
 *                   brand_name:
 *                     type: string
 *                     description: Brands name
 *                     example: "Brands Name"
 *                   brand_image:
 *                     type: string
 *                     description: fila brand
 *                     example: "Brand1,jpg"
 *                   brand_logo:
 *                     type: string
 *                     description: fila brand logo
 *                     example: "brand_logo2,jpg"
 *                   brand_discount:
 *                     type: float
 *                     description: Brands discount
 *                     example: 10
 *                   description:
 *                     type: string
 *                     description: Brands description
 *                     example: "desc"
 *                   url:
 *                     type: string
 *                     description: Brands url
 *                     example: "url"
 *                   meta_title:
 *                     type: string
 *                     description: Brands meta_title
 *                     example: "meta_title"
 *                   meta_descriptions:
 *                     type: string
 *                     description: Brands meta_descriptions
 *                     example: "meta_descriptions"
 *                   meta_keywords:
 *                     type: string
 *                     description: Brands meta_keywords
 *                     example: "meta_keywords"
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
 * /api/UpdateBrand/{id}:
 *   put:
 *     summary: Update a Brand by ID
 *     description: Update the details of a specific brand by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the brand to update.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               brand_name:
 *                 type: string
 *                 description: The name of the brand.
 *                 example: "Brand Name"
 *               brand_image:
 *                 type: string
 *                 format: binary
 *                 description: The image file associated with the brand.
 *               brand_logo:
 *                 type: string
 *                 format: binary
 *                 description: The logo file associated with the brand.
 *               brand_discount:
 *                 type: number
 *                 format: float
 *                 description: The discount percentage for the brand.
 *                 example: 10.5
 *               description:
 *                 type: string
 *                 description: A description of the brand.
 *                 example: "This is a sample brand description."
 *               url:
 *                 type: string
 *                 format: uri
 *                 description: The URL associated with the brand.
 *                 example: "https://www.examplebrand.com"
 *               meta_title:
 *                 type: string
 *                 description: The meta title for SEO purposes.
 *                 example: "Brand Meta Title"
 *               meta_description:
 *                 type: string
 *                 description: The meta description for SEO purposes.
 *                 example: "Brand Meta Description"
 *               meta_keywords:
 *                 type: string
 *                 description: The meta keywords for SEO purposes.
 *                 example: "brand, example, products"
 *     responses:
 *       '200':
 *         description: ✅ Brand updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Brand updated successfully."
 *       '400':
 *         description: 👎 Invalid request parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data."
 *       '404':
 *         description: ❌ Brand not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Brand with the specified ID does not exist."
 *       '500':
 *         description: 🚫 Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */

/**
 * @swagger
 * /api/GetSingleBrandDetails/{id}:
 *   get:
 *     summary: Retrieve a Brand by ID
 *     description: Retrieve a specific Brand by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Brand to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: ✅ A single Brand found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Brand ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Brand name
 *                   example: "Brand Name"
 *       '404':
 *         description: ❌ Brand not found
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/AddBrand:
 *   post:
 *     summary: Add a new Brand
 *     description: Add a new Brand
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               brand_name:
 *                 type: string
 *                 description: Brand name
 *               brand_image:
 *                 type: string
 *                 format: binary
 *                 description: Brand image
 *               brand_logo:
 *                 type: string
 *                 format: binary
 *                 description: Brand logo
 *               brand_discount:
 *                 type: float
 *                 description: Brand discount
 *               description:
 *                 type: string
 *                 description: Brand description
 *               url:
 *                 type: string
 *                 description: Brand url
 *               meta_title:
 *                 type: string
 *                 description: Brand meta_title
 *               meta_descriptions:
 *                 type: string
 *                 description: Brand meta_descriptions
 *               meta_keywords:
 *                 type: string
 *                 description: Brand meta_keywords
 *               
 *     responses:
 *       '201':
 *         description: ✅ Brand added successfully
 *       '400':
 *         description: 👎 Bad request
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/AllBrandCount:
 *  get:
 *    summary: Get the total number of brand
 *    description: Retrieve the total count brand
 *    responses:
 *      '200':
 *        description: ✅ The total count of brand
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                count:
 *                  type: integer
 *                  description: The total count of brand
 *                  example: 42
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: '🚫 Internal server error'
 */

/**
 * @swagger
 * /api/branddelete/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     description: Delete a specific brand by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brand to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: ✅ brand deleted successfully
 *       '404':
 *         description: ❌ brand not found
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/handlebrandstatus/{id}:
 *   put:
 *     summary: Update brand status by ID
 *     description: Update the status of a specific brand by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brand to update status
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
 *                 description: New status of the brand
 *                 example: "active"
 *     responses:
 *       '200':
 *         description: ✅ brand status updated successfully
 *       '400':
 *         description: 👎 Bad request
 *       '404':
 *         description: ❌ brand not found
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/SearchBrands/{searchTerm}:
 *   get:
 *     summary: Search for brands
 *     description: Search for brands by a specific term.
 *     parameters:
 *       - in: path
 *         name: searchTerm
 *         required: true
 *         description: The term to search for brands.
 *         schema:
 *           type: string
 *           example: "Electronics"
 *     responses:
 *       '200':
 *         description: ✅ Brands found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "✅ Brands found successfully."
 *       '500':
 *         description: 🚫 Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "🚫 Internal server error."
 */

router.get("/getAllBrands")
router.get("/GetSingleBrandDetails/:id")
router.put("/UpdateBrand/:id")
router.post("/AddBrand")
router.get("/AllBrandCount")
router.delete("/branddelete/:id")
router.put("/handlebrandstatus/:id")
router.get("/SearchBrands/:searchTerm")
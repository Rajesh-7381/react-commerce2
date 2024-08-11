const express=require("express");
const router=express.Router();
const upload=require("../utils/multerConfig");
const productController=require("../Controller/productController");

/**
 * @swagger
 * /api/getAllProducts:
 *   get:
 *     summary: Retrieve all products
 *     description: Retrieve a list of all products
 *     responses:
 *       '200':
 *         description: ✅ A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Product ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Product name
 *                     example: "Product Name"
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
 * /api/updateproducts/{id}:
 *   put:
 *     summary: Update a product by ID
 *     description: Update a specific product by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
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
 *               product_video:
 *                 type: string
 *                 format: binary
 *                 description: Product video
 *     responses:
 *       '200':
 *         description: ✅ Product updated successfully
 *       '400':
 *         description: 👎 Bad request
 *       '404':
 *         description: ❌ Product not found
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/productedit/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     description: Retrieve a specific product by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: ✅ A single product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Product ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Product name
 *                   example: "Product Name"
 *       '404':
 *         description: ❌ Product not found
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/productdelete/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Delete a specific product by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: ✅ Product deleted successfully
 *       '404':
 *         description: ❌ Product not found
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/updatestatus/{id}:
 *   put:
 *     summary: Update product status by ID
 *     description: Update the status of a specific product by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update status
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
 *                 description: New status of the product
 *                 example: "active"
 *     responses:
 *       '200':
 *         description: ✅ Product status updated successfully
 *       '400':
 *         description: 👎 Bad request
 *       '404':
 *         description: ❌ Product not found
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/productcolor:
 *   get:
 *     summary: Retrieve product colors
 *     description: Retrieve a list of available product colors
 *     responses:
 *       '200':
 *         description: ✅ A list of product colors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   color:
 *                     type: string
 *                     description: Product color
 *                     example: "Red"
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/allproductcount:
 *   get:
 *     summary: Retrieve the total count of products
 *     description: Retrieve the total number of products
 *     responses:
 *       '200':
 *         description: ✅ The total count of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: The total count of products
 *                   example: 100
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/addproducts:
 *   post:
 *     summary: Add a new product
 *     description: Add a new product with video and images
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - category_id
 *               - brand_id
 *               - product_video
 *               - product_image
 *               - product_name
 *               - product_code
 *               - group_code
 *               - product_color
 *               - family_color
 *               - product_price
 *               - product_discount
 *               - product_weight
 *               - final_price
 *               - productdiscount_type
 *               - description
 *               - attribute
 *               - washcare
 *               - fabric
 *               - keywords
 *               - pattern
 *               - sleeve
 *               - fit
 *               - occassion
 *               - meta_title
 *               - meta_description
 *               - meta_keywords
 *               - is_featured
 *             properties:
 *               category_id:
 *                 type: integer
 *                 example: 11
 *                 description: category id
 *               brand_id:
 *                 type: integer
 *                 example: 14
 *                 description: brand id
 *               product_video:
 *                 type: string
 *                 format: binary
 *                 description: Product video
 *               product_image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Product images
 *               product_name:
 *                 type: string
 *                 description: Name of the product
 *               product_code:
 *                 type: string
 *                 description: product code
 *               group_code:
 *                 type: string
 *                 description: group code
 *               product_color:
 *                 type: string
 *                 description: Color of the product
 *               family_color:
 *                 type: string
 *                 description: Color of the family want
 *               product_price:
 *                 type: number
 *                 example: 1000
 *                 description: Discount of the product
 *               product_discount:
 *                 type: number
 *                 example: 10
 *                 format: float
 *                 description: discount of the product
 *               product_weight:
 *                 type: string
 *                 format: float
 *                 description: weight of the product
 *               final_price:
 *                 type: number
 *                 format: float
 *                 description: weight of the product
 *               productdiscount_type:
 *                 type: string
 *                 description: discount type of the product
 *               description:
 *                 type: string
 *                 description: description of the product
 *               attribute:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     size:
 *                       type: string
 *                       description: Size of the product.
 *                     sku:
 *                       type: string
 *                       description: SKU of the product.
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: Price of the attribute.
 *                     stock:
 *                       type: integer
 *                       description: Stock available for the attribute.
 *               washcare:
 *                 type: string
 *                 description: washcare of the product
 *               fabric:
 *                 type: string
 *                 description: fabric of the product
 *               keywords:
 *                 type: string
 *                 description: keywords of the product
 *               pattern:
 *                 type: string
 *                 description: pattern of the product
 *               sleeve:
 *                 type: string
 *                 description: sleeve of the product
 *               fit:
 *                 type: string
 *                 description: fit of the product
 *               occassion:
 *                 type: string
 *                 description: occassion of the product
 *               meta_title:
 *                 type: string
 *                 description: meta_title of the product
 *               meta_description:
 *                 type: string
 *                 description: meta_description of the product
 *               meta_keywords:
 *                 type: string
 *                 description: meta_keywords of the product
 *               is_featured:
 *                 type: boolean
 *                 description: true or false
 *     responses:
 *       '200':
 *         description: ✅ Product added successfully
 *       '400':
 *         description: 👎 Bad request
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/getAllproductsImages:
 *   get:
 *     summary: Retrieve product images
 *     description: Retrieve a list of product images
 *     responses:
 *       '200':
 *         description: ✅ A list of product images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Image ID
 *                     example: 1
 *                   url:
 *                     type: string
 *                     description: Image URL
 *                     example: "http://example.com/image.jpg"
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/handleproductsstatus/{id}:
 *   put:
 *     summary: Update product image status by ID
 *     description: Update the status of a specific product image by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product image to update status
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
 *                 description: New status of the product image
 *                 example: "active"
 *     responses:
 *       '200':
 *         description: ✅ Product image status updated successfully
 *       '400':
 *         description: 👎 Bad request
 *       '404':
 *         description: ❌ Product image not found
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/productsimagedelete/{id}:
 *   delete:
 *     summary: Delete a product image by ID
 *     description: Delete a specific product image by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product image to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: ✅ Product image deleted successfully
 *       '404':
 *         description: ❌ Product image not found
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/handleproductImagesstatus/{id}:
 *   put:
 *     summary: Update product image status by ID
 *     description: Update the status of a specific product image status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product image status
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: New status of the product image status
 *                 example: "active"
 *     responses:
 *       200:
 *         description: ✅ Product image status updated successfully
 *       400:
 *         description: 👎 Bad request
 *       404:
 *         description: ❌ Product image not found
 *       500:
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/editproductattributes/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     description: Retrieve a specific product by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the productattribute to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: ✅ A single productattribute
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Product ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Product name
 *                   example: "Product Name"
 *       '404':
 *         description: ❌ Product not found
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/ProductAttributesStatusChange/{id}:
 *   put:
 *     summary: Update product attribute status by ID
 *     description: Update the status of a specific product stribute status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product attribute  status
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
 *                 description: New status of the product attribute status
 *                 example: "active"
 *     responses:
 *       '200':
 *         description: ✅ Product attribute status updated successfully
 *       '400':
 *         description: 👎 Bad request
 *       '404':
 *         description: ❌ Product attribute not found
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/deleteattribute/{id}:
 *   delete:
 *     summary: Delete a product attribute by ID
 *     description: Delete a specific product attribute by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product attribute to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: ✅ Product attribute deleted successfully
 *       '404':
 *         description: ❌ Product attribute not found
 *       '500':
 *         description: 🚫 Internal server error
 */
/**
 * @swagger
 * /api/allproductsAttributes:
 *   get:
 *     summary: Retrieve all products
 *     description: Retrieve a list of all products attribue
 *     responses:
 *       '200':
 *         description: ✅ A list of products attribute
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Product ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Product name
 *                     example: "Product Name"
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

router.get("/getAllProducts", productController.getAllProducts);
router.put("/updateproducts/:id", upload.single("product_video"), productController.updateProduct);
router.get("/productedit/:id", productController.getProductById);
router.delete("/productdelete/:id", productController.deleteProduct);
router.put("/updateproducts/:id", productController.updateProductStatus);
router.get("/productcolor", productController.getProductColors);
router.get("/allproductcount", productController.getProductCount);
router.post('/addproducts', upload.fields([{ name: 'product_video', maxCount: 1 }, { name: 'product_image', maxCount: 20 }]), productController.addProduct);
router.get("/getAllproductsImages", productController.getProductImages);
router.put("/handleproductstatus/:id", productController.updateProductStatus);


router.delete("/ProductsImageDelete/:id", productController.deleteImage);
router.put("/handleproductImagesstatus/:id", productController.handleproductImagesstatus);
router.get("/editproductattributes/:id", productController.editproductattributes);
router.put("/handleproductImagesstatus/:id", productController.ProductAttributesStatusChange);
router.delete("/deleteattribute/:id", productController.deleteattribute);
router.get("/allproductsAttributes", productController.allproductsAttributes);
router.get("/SearchProducts/:searchTerm");
router.get("/ProductAttributesStatusChange/:id");

module.exports=router;
const express=require("express");
const router=express.Router();
const upload=require("../utils/multerConfig");
const frontController=require("../Controller/frontController")

/**
 * @swagger
 * /api/ContactUS:
 *   post:
 *     summary: Add a contact form
 *     description: Add a contact form
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: john doe
 *                 example: "john doe"
 *               email:
 *                 type: string
 *                 description: john@gmail.com
 *                 example: "john@gmail.com"
 *               subject:
 *                 type: string
 *                 description: subject
 *                 example: "subject name"
 *               message:
 *                 type: string
 *                 description: message
 *                 example: "good service"
 *     responses:
 *       201:
 *         description: Contact form added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/AllProductDetailsShown:
 *   get:
 *     summary: Retrieve all products
 *     description: Retrieve a list of all products
 *     responses:
 *       '200':
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: products ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: products name
 *                     example: "products Name"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/listingproduct:
 *   get:
 *     summary: Retrieve all list of products
 *     description: Retrieve a list of all list of products
 *     responses:
 *       '200':
 *         description: A list of list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: list of products ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: list of products name
 *                     example: "list of products Name"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */


/**
 * @swagger
 * /api/productDetails/{id}:
 *   get:
 *     summary: Retrieve a productDetails by ID
 *     description: Retrieve a specific productDetails by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the productDetails to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: A single productDetails
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: productDetails ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: productDetails name
 *                   example: "productDetails Name"
 *       '404':
 *         description: productDetails not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/productdetailscount:
 *  get:
 *    summary: Get the total number of productdetailscount
 *    description: Retrieve the total count of productdetailscount with the role 'user'
 *    responses:
 *      '200':
 *        description: The total count of productdetailscount
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                count:
 *                  type: integer
 *                  description: The total count of productdetailscount
 *                  example: 43
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
 * /api/create-payment-intent:
 *   post:
 *     summary: Add a c new payment using stripe
 *     description: Add a payment using stripe
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: new payment using stripe
 *               
 *     responses:
 *       '201':
 *         description: payment using stripe added successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/DeliveryAddress:
 *   post:
 *     summary: Add a DeliveryAddress form
 *     description: Add a DeliveryAddress form
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: new DeliveryAddress form
 *               
 *     responses:
 *       '201':
 *         description: DeliveryAddress form added successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

// write swagger for card
router.post("/ContactUS",upload.none(),frontController.contactUs)
router.get("/AllProductDetailsShown",frontController.AllProductDetails)
router.get("/listingproduct",frontController.listingproduct)
router.get("/productDetails/:id",frontController.productDetails)
router.get("/productdetailscount",frontController.productdetailscount)
router.post("/create-payment-intent")
router.post("/DeliveryAddress")
router.post("/cardData",upload.none(),frontController.Card);
router.post("/DeliveryAddress",upload.none(),frontController.DeliveryAddress);
router.get("/getAllCards",frontController.getAll);

module.exports=router
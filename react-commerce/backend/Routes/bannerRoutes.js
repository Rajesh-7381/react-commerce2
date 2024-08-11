const express=require("express");
const router=express.Router();
const upload=require("../utils/multerConfig");
const BannerController = require("../Controller/BannerController");

/**
 * @swagger
 * /api/AddBanners:
 *   post:
 *     summary: Add a new Banner
 *     description: Add a new Banner with an image and associated details.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               BannerImage:  # this was matched otherwise shown error
 *                 type: string
 *                 format: binary
 *                 description: The image file for the banner.
 *               type:
 *                 type: string
 *                 description: The type of the banner.
 *                 example: homepage
 *               link:
 *                 type: string
 *                 description: A URL link associated with the banner.
 *                 example: https://github.com/Rajesh-7381/react-commerce2
 *               alt:
 *                 type: string
 *                 description: Alternative text for the banner image.
 *                 example: alternative name
 *     responses:
 *       '200':
 *         description: ✅ Banner added successfully.
 *       '400':
 *         description: ❌ Bad request. Make sure the request is correct.
 *       '500':
 *         description: 🚫 Internal server error.
 */


/**
 * @swagger
 * /api/getAllBanners:
 *   get:
 *     summary: Retrieve all banners
 *     description: Retrieve a list of all banners
 *     responses:
 *       '200':
 *         description: ✅ A list of banners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: banners ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: banners name
 *                     example: "banners Name"
 *                   image:
 *                     type: string
 *                     description: banner image name
 *                     example: "banner1.png"
 *                   type:
 *                     type: string
 *                     description: banner type 
 *                     example: "landing page banner"
 *                   link:
 *                     type: string
 *                     description: banner link 
 *                     example: "https://www.google.com/search?q=400+for+bad+request+emoji&oq=400+for+bad+request+emoji&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigAdIBCTEyMTEwajBqN6gCCLACAQ&sourceid=chrome&ie=UTF-8"
 *                   alt:
 *                     type: string
 *                     description: banner image alt 
 *                     example: "banner1"
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
 * /api/EditBannerDetails/{idOrUuid}:
 *   get:
 *     summary: Retrieve a banner by ID or UUID
 *     description: Retrieve a specific banner by its ID or UUID
 *     parameters:
 *       - in: path
 *         name: idOrUuid
 *         required: true
 *         description: ID or UUID of the banner to retrieve
 *         schema:
 *           type: string
 *           oneOf:
 *             - type: integer
 *               example: 5 
 *             - type: string
 *               format: uuid
 *               example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       '200':
 *         description: ✅ A single banner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Banner ID
 *                   example: 1
 *                 uuid:
 *                   type: string
 *                   format: uuid
 *                   description: Banner UUID
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 name:
 *                   type: string
 *                   description: Banner name
 *                   example: "Banner Name"
 *                 image:
 *                   type: string
 *                   description: Banner image name
 *                   example: "banner1.png"
 *                 type:
 *                   type: string
 *                   description: Banner type
 *                   example: "landing page banner"
 *                 link:
 *                   type: string
 *                   description: Banner link
 *                   example: "https://www.example.com"
 *                 alt:
 *                   type: string
 *                   description: Banner image alt text
 *                   example: "banner1"
 *       '404':
 *         description: ❌ Banner not found
 *       '500':
 *         description: 🚫 Internal server error
 */


/**
 * @swagger
 * /api/UpdateBanners/{idOrUuid}:
 *   put:
 *     summary: Update a banner by ID or UUID
 *     description: Update a specific banner by its ID or UUID
 *     parameters:
 *       - in: path
 *         name: idOrUuid
 *         required: true
 *         description: ID or UUID of the banner to update
 *         schema:
 *           type: string
 *           oneOf:
 *             - type: integer
 *               example: 5
 *             - type: string
 *               format: uuid
 *               example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: Banner ID
 *                 example: 1
 *               uuid:
 *                 type: string
 *                 format: uuid
 *                 description: Banner UUID
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               name:
 *                 type: string
 *                 description: Banner name
 *                 example: "Banner Name"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Banner image file
 *                 example: "banner1.png"
 *               type:
 *                 type: string
 *                 description: Banner type
 *                 example: "landing page banner"
 *               link:
 *                 type: string
 *                 description: Banner link
 *                 example: "https://www.example.com"
 *               alt:
 *                 type: string
 *                 description: Banner image alt text
 *                 example: "banner1"
 *     responses:
 *       '200':
 *         description: ✅ Banner updated successfully
 *       '400':
 *         description: 👎 Bad request
 *       '404':
 *         description: ❌ Banner not found
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
 * /api/handlebannerstatus/{id}:
 *   put:
 *     summary: Update banners status by ID
 *     description: Update the status of a specific banners by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the banners to update status
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
 *                 description: New status of the banners
 *                 example: "active"
 *     responses:
 *       '200':
 *         description: ✅ banners status updated successfully
 *       '400':
 *         description: 👎 Bad request
 *       '404':
 *         description: ❌ banners not found
 *       '500':
 *         description: 🚫 Internal server error
 */

/**
 * @swagger
 * /api/DeleteBanners/{id}:
 *   delete:
 *     summary: Delete a banners by ID
 *     description: Delete a specific banners by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the banners to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: ✅ banners deleted successfully
 *       '404':
 *         description: ❌ banners not found
 *       '500':
 *         description: 🚫 Internal server error
 */

router.post("/AddBanners",upload.single("BannerImage"),BannerController.addBanner)
router.get("/getAllBanners")
router.get("EditBannerDetails/:id")
router.put("UpdateBanners/:id")
router.put("handlebannerstatus/:id")
router.delete("DeleteBanners/:id")

module.exports=router;
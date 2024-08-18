const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig");
const cmsController = require("../Controller/cmsPageController");

/**
 * @swagger
 * /api/getAllCmss:
 *   get:
 *     summary: Get all CMS page data
 *     description: Retrieve all CMS data
 *     responses:
 *       '200':
 *         description: ✅ A list of CMS data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: CMS ID
 *                     example: 1
 *                   title:
 *                     type: string
 *                     description: CMS title
 *                     example: "home"
 *                   description:
 *                     type: string
 *                     description: CMS description
 *                     example: "description"
 *                   url:
 *                     type: string
 *                     description: CMS url
 *                     example: "url"
 *                   meta_title:
 *                     type: string
 *                     description: CMS meta_title
 *                     example: "meta_title"
 *                   meta_description:
 *                     type: string
 *                     description: CMS meta_description
 *                     example: "meta_description"
 *                   meta_keywords:
 *                     type: string
 *                     description: CMS meta_keywords
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
 *                   example: 🚫 internal server error
 */
router.get("/getAllCmss", cmsController.getAllPages);

/**
 * @swagger
 * /api/handlecmspagestatus/{id}:
 *   put:
 *     summary: Change the status of a CMS page
 *     description: Change the status of a CMS page by its ID (1 = active, 0 = inactive)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the CMS page
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
 *                 type: integer
 *                 description: Status of the CMS page (1 = active, 0 = inactive)
 *                 example: 1
 *     responses:
 *       '200':
 *         description: ✅ Status changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ✅ Status changed successfully
 *       '400':
 *         description: 👎 Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 👎 Bad request
 *       '404':
 *         description: ❌ CMS page not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ❌ CMS page not found
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

router.put("/handlecmsstatus/:id", cmsController.updatePageStatus);

/**
 * @swagger
 * /api/cmspagedelete/{id}:
 *   delete:
 *     summary: Delete a CMS page
 *     description: Delete a CMS page by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the CMS page to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: ✅ Page deleted successfully
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
router.delete("/cmspagedelete/:id", cmsController.deletePage);

/**
 * @swagger
 * /api/cmsupdatepage/{id}:
 *   put:
 *     summary: Update a CMS page
 *     description: Update a CMS page by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the CMS page to update
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
 *                   title:
 *                     type: string
 *                     description: CMS title
 *                     example: "home"
 *                   description:
 *                     type: string
 *                     description: CMS description
 *                     example: "description"
 *                   url:
 *                     type: string
 *                     description: CMS url
 *                     example: "url"
 *                   meta_title:
 *                     type: string
 *                     description: CMS meta_title
 *                     example: "meta_title"
 *                   meta_description:
 *                     type: string
 *                     description: CMS meta_description
 *                     example: "meta_description"
 *                   meta_keywords:
 *                     type: string
 *                     description: CMS meta_keywords
 *                     example: "meta_keywords"
 *     responses:
 *       '200':
 *         description: ✅ Page updated successfully
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

router.put("/cmsupdatepage/:id", upload.none(), cmsController.updatePage);

/**
 * @swagger
 * /api/cmsaddpage:
 *   post:
 *     summary: Add a new CMS page
 *     description: Add a new CMS page
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the new CMS page
 *                 example: "aboutus"
 *               description:
 *                 type: string
 *                 description: Description of the new CMS page
 *                 example: "aboutus description"
 *               url:
 *                 type: string
 *                 description: URL of the new CMS page
 *                 example: "url"
 *               meta_title:
 *                 type: string
 *                 description: Meta title of the new CMS page
 *                 example: "meta_title"
 *               meta_description:
 *                 type: string
 *                 description: Meta description of the new CMS page
 *                 example: "meta_description"
 *               meta_keywords:
 *                 type: string
 *                 description: Meta keywords of the new CMS page
 *                 example: "meta_keywords"
 *     responses:
 *       '200':
 *         description: ✅ Page added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ✅ Page added successfully
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


router.post("/cmsaddpage", upload.none(), cmsController.addPage);

/**
 * @swagger
 * /api/cmspageeditdata/{id}:
 *   get:
 *     summary: Get a CMS page by ID
 *     description: Retrieve a CMS page by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the CMS page to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: ✅ Page retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the CMS page.
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: The title of the CMS page.
 *                   example: "Home"
 *                 description:
 *                   type: string
 *                   description: The content of the CMS page.
 *                   example: "This is the home page description."
 *                 url:
 *                   type: string
 *                   description: The URL associated with the CMS page.
 *                   example: "https://example.com/home"
 *                 meta_title:
 *                   type: string
 *                   description: Meta title for SEO.
 *                   example: "Home Page"
 *                 meta_description:
 *                   type: string
 *                   description: Meta description for SEO.
 *                   example: "Welcome to the home page."
 *                 meta_keywords:
 *                   type: string
 *                   description: Meta keywords for SEO.
 *                   example: "home, landing, main"
 *       '500':
 *         description: 🚫 Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "🚫 Internal server error"
 */

router.get("/cmspageeditdata/:id", cmsController.getPageById);
/**
 * @swagger
 * /api/SearchCMSPageData/{searchTerm}:
 *   get:
 *     summary: Search CMS pages
 *     description: Retrieve a list of CMS pages that match the search term
 *     parameters:
 *       - in: path
 *         name: searchTerm
 *         required: true
 *         description: The search term to filter CMS pages
 *         schema:
 *           type: string
 *           example: "home"
 *     responses:
 *       '200':
 *         description: ✅ A list of CMS data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: CMS ID
 *                     example: 1
 *                   title:
 *                     type: string
 *                     description: Title of the CMS page
 *                     example: "Home Page"
 *                   description:
 *                     type: string
 *                     description: Description of the CMS page
 *                     example: "This is the home page."
 *                   url:
 *                     type: string
 *                     description: URL of the CMS page
 *                     example: "home"
 *                   meta_title:
 *                     type: string
 *                     description: Meta title of the CMS page
 *                     example: "Home Page"
 *                   meta_description:
 *                     type: string
 *                     description: Meta description of the CMS page
 *                     example: "Description for home page"
 *                   meta_keywords:
 *                     type: string
 *                     description: Meta keywords for the CMS page
 *                     example: "home, main"
 *       '404':
 *         description: ❌ No CMS pages found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ❌ No CMS pages found
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

router.get("/SearchCMSPageData/:searchTerm", cmsController.searchCMSData);


module.exports = router;

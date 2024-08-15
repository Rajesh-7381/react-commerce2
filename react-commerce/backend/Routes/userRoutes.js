const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig");

const {
  Login,
  RegisterUser,
  AdminUserController,
} = require("../Controller/userController");

//   =====================START api/register=======================================
const registerusercontroller = new RegisterUser();
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user or admin or subadmin
 *     description: Register all admin users or subadmins
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description:  to create new user
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - email
 *             - password
 *             - mobile
 *             - image
 *           properties:
 *             name:
 *               type: string
 *               example: "john doe"
 *             mobile:
 *               type: string
 *               example: 9087327689
 *             email:
 *               type: string
 *               example: "john@gmail.com"
 *             password:
 *               type: string
 *               example: "Password@12345678"
 *             image:
 *               type: string
 *               format: binary
 *               example: "john.png"
 *     responses:
 *       200:
 *         description: ✅ User registered successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: 🚫 Internal server error
 */
router.post("/register", upload.single("image"), (req, res) => {
  registerusercontroller.CreateRegisterAdminUser(req, res);
});

//   =====================END=======================================
//   =====================START api/login=======================================
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Verify a user or admin or subadmin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: ✅ User or admin or subadmin verified successfully
 *       201:
 *         description: Created
 *       409:
 *         description: Conflict
 *       404:
 *         description: ❌ Not Found
 *       500:
 *         description: 🚫 Internal Server Error
 */
router.post("/login", Login);

//   =====================END=======================================
//   =====================START api/email check=======================================
/**
 * @swagger
 * /api/checkemail/{email}:
 *   get:
 *     summary: Check if an email exists
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email to check
 *         schema:
 *           type: string
 *           example: "user@example.com"
 *     responses:
 *       200:
 *         description: ✅ Email existence status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 emailExists:
 *                   type: boolean
 *       500:
 *         description: 🚫 Internal Server Error
 */
router.get("/checkemail/:email", AdminUserController.checkEmail);

//   =====================END=======================================
//   =====================START api/mobile check=======================================

/**
 * @swagger
 * /api/checkmobile/{mobile}:
 *   get:
 *     summary: Check if  mobile exists
 *     parameters:
 *       - in: path
 *         name: mobile
 *         required: true
 *         description: The mobile to check
 *         schema:
 *           type: string
 *           example: "9090390396"
 *     responses:
 *       200:
 *         description: ✅ mobile existence status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 emailExists:
 *                   type: boolean
 *       500:
 *         description: 🚫 Internal Server Error
 */
router.get("/checkmobile/:mobile", AdminUserController.Mobile);

//   =====================END=======================================
//   =====================START api/uuid check======================

// Check UUID Route
/**
 * @swagger
 * /api/UniqueID/{unique_id}:
 *   get:
 *     summary: Check if UUID exists
 *     parameters:
 *       - in: path
 *         name: unique_id
 *         required: true
 *         description: UUID check
 *         schema:
 *           type: string
 *           example: 703d08e6-87d6-4fd4-9c7c-67d8c1304f7b
 *     responses:
 *       200:
 *         description: ✅ UUID existence status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 *       500:
 *         description: 🚫 Internal server error
 */
router.get("/UniqueID/:unique_id", AdminUserController.checkUniqeID);

/**
 * @swagger
 * /api/passwordforgot/{email}:
 *   post:
 *     summary: Update the password for a given email
 *     description: Update the password for a given email address.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The user's email address.
 *         schema:
 *           type: string
 *           example: "user@example.com"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password.
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: ✅ Password updated successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: 🚫 Internal server error
 */

router.post("/passwordforgot/:email", AdminUserController.forgotPassword);

/**
 * @swagger
 * /api/countuser:
 *  get:
 *    summary: Get the total number of users
 *    description: Retrieve the total count of users with the role 'user'
 *    responses:
 *      '200':
 *        description: ✅ The total count of users
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                count:
 *                  type: integer
 *                  description: The total count of users
 *                  example: 42
 *      '500':
 *        description: 🚫 Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: '🚫 Internal server error'
 */
router.get("/countuser", AdminUserController.countUser);

/**
 * @swagger
 * /api/countadmin:
 *  get:
 *    summary: Get the total number of admin
 *    description: Retrieve the total count of admin with the role 'user'
 *    responses:
 *      '200':
 *        description: ✅ The total count of admin
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                count:
 *                  type: integer
 *                  description: The total count of admin
 *                  example: 42
 *      '500':
 *        description: 🚫 Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: '🚫 🚫 Internal server error'
 */
router.get("/countadmin", AdminUserController.countAdmin);

/**
 * @swagger
 * /api/countsubadmin:
 *  get:
 *    summary: Get the total number of subadmin
 *    description: Retrieve the total count of subadmin with the role 'user'
 *    responses:
 *      '200':
 *        description: ✅ The total count of subadmin
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                count:
 *                  type: integer
 *                  description: The total count of subadmin
 *                  example: 43
 *      '500':
 *        description: 🚫 Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: '🚫 Internal server error'
 */

router.get("/countsubadmin", AdminUserController.countSubAdmin);

/**
 * @swagger
 * /api/getAllAdminSubadminUsers:
 *   get:
 *     summary: Get the total number of Admin and Subadmin users
 *     description: Retrieve the total count of Admin and Subadmin users
 *     responses:
 *       '200':
 *         description: ✅ Retrieve the total count of Admin and Subadmin users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: The total count of Admin and Subadmin users
 *                   example: 42
 *       '500':
 *         description: 🚫 Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: '🚫 Internal server error'
 */
router.get("/getAllAdminSubadminUsers", AdminUserController.getAllAdminSubadminUsers);

/**
 * @swagger
 * /api/singledata/{id}:
 *   get:
 *     summary: Check if ID exists
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Check if ID exists
 *         schema:
 *           type: integer
 *           example: 56
 *     responses:
 *       '200':
 *         description: ✅ ID existence status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 *       '500':
 *         description: 🚫 Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: '🚫 Internal server error'
 */
router.get("/singledata/:id",AdminUserController.indvidualDetails);
/**
 * @swagger
 * /api/editdata/{id}:
 *   get:
 *     summary: Check if ID exists
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Check if ID exists
 *         schema:
 *           type: integer
 *           example: 56
 *     responses:
 *       '200':
 *         description: ✅ ID existence status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 *       '500':
 *         description: 🚫 Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: '🚫 Internal server error'
 */
router.get("/editdata/:id",AdminUserController.EditDetails);

/**
 * @swagger
 * /api/update/{id}:
 *   put:
 *     summary: Update user information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
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
 *                 example: John Doe
 *               mobile:
 *                 type: string
 *                 example: '1234567890'
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: 'password123'
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       '200':
 *         description: ✅ Data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ✅ Data updated successfully!
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

router.put("/update/:id",AdminUserController.Update)

/**
 * @swagger
 * /api/deleteAdminSubAdminUser/{id}:
 *   delete:
 *     summary: Soft delete an Admin or Sub-Admin user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to soft delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: ✅ User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ✅ deleted successfully!
 *       '500':
 *         description: 🚫 Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 🚫 🚫 Internal server error
 */
router.delete("/deleteAdminSubAdminUser/:id", AdminUserController.deleteAdminSubAdminUser);

/**
 * @swagger
 * /api/SearchAdminSubAdminUser/{searchTerm}:
 *  get:
 *    summary: search admin or user or subadmin
 *    parameters:
 *      - in: path
 *        name: searchTerm
 *        required: 
 *        description: name through seached
 *        schema:   
 *          type: searchTerm
 *          example: name or email or mobile
 *    responses:
 *      '200': 
 *        description: 
 *          content: 
 *            application/json: 
 *              schema: 
 *                type: object
 *                propoties: 
 *                  message: 
 *                    type: string
 *                    example: ✅ found successfully!
 *      '500': 
 *        description: 
 *          content: 
 *            application/json: 
 *              schema: 
 *                type: object
 *                propoties: 
 *                  message: 
 *                    type: string
 *                    example: 🚫 Internal server error
 */
router.get("/SearchAdminSubAdminUser/:searchTerm",AdminUserController.SearchAdminSubAdminUser)

/**
 * @swagger
 * /api/registerUserParticularDate/{date}:
 *  get:
 *    summary: search particular user
 *    parameters:
 *      - in: path
 *        name: date
 *        required: 
 *        description: name through seached
 *        schema:   
 *          type: date
 *          format: date
 *          example: 12-04-1998
 *    responses:
 *      '200': 
 *        description: 
 *          content: 
 *            application/json: 
 *              schema: 
 *                type: object
 *                propoties: 
 *                  message: 
 *                    type: date
 *                    example: ✅ found successfully!
 *      '500': 
 *        description: 
 *          content: 
 *            application/json: 
 *              schema: 
 *                type: object
 *                propoties: 
 *                  message: 
 *                    type: string
 *                    example: 🚫 🚫 Internal server error
 */
router.get("/registerUserParticularDate/:date",AdminUserController.registerUserParticularDate)

/**
 * @swagger
 * /api/registerUserfromrDateTotodate/{fromdate}/{todate}:
 *   get:
 *     summary: Get the count of users registered between two dates
 *     parameters:
 *       - in: path
 *         name: fromdate
 *         required: true
 *         description: Start date in the format DD-MM-YYYY
 *         schema:
 *           type: string
 *           example: "12-04-1998"
 *       - in: path
 *         name: todate
 *         required: true
 *         description: End date in the format DD-MM-YYYY
 *         schema:
 *           type: string
 *           example: "31-12-2024"
 *     responses:
 *       '200':
 *         description: ✅ The count of users registered between the specified dates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: The count of users
 *                   example: 42
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
router.get("/registerUserfromrDateTotodate/:fromdate/:todate",AdminUserController.registerUserfromrDateTotodate);

/**
 * @swagger
 * /api/getAllSubAdminData:
 *   get:
 *     summary: Get all SubAdmin and User data
 *     description: Retrieve all records from AdminUser where the role is either 'subadmin' or 'user'
 *     responses:
 *       '200':
 *         description: ✅ A list of SubAdmin and User data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The name of the user
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     description: The email of the user
 *                     example: "john@example.com"
 *                   mobile:
 *                     type: string
 *                     description: The mobile number of the user
 *                     example: "1234567890"
 *                   role:
 *                     type: string
 *                     description: The role of the user
 *                     example: "subadmin"
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
router.get("/getAllSubAdminData",AdminUserController.getAllSubAdminData);

module.exports = router;

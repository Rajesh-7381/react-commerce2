const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig");
const { Login, RegisterUser, AdminUserController, Logout,} = require("../Controller/userController");
const RouteCheckAuth = require("../Auth/RouteCheckAuth");
const {authenticate} = require("../Middleware/PassPort");

const registerusercontroller = new RegisterUser();
router.post("/register", upload.single("image"), (req, res) => { registerusercontroller.CreateRegisterAdminUser(req, res) });
router.post("/login",Login);
router.post('/logout',Logout.Logout)
router.get("/checkemail/:email", AdminUserController.checkEmail);
router.get("/checkmobile/:mobile" , AdminUserController.Mobile);
router.get("/UniqueID/:unique_id",RouteCheckAuth , AdminUserController.checkUniqeID);
router.post("/passwordforgot/:email" , AdminUserController.forgotPassword);
router.get("/countuser",RouteCheckAuth , AdminUserController.countUser);
router.get("/countadmin",RouteCheckAuth , AdminUserController.countAdmin);
router.get("/countsubadmin",RouteCheckAuth , AdminUserController.countSubAdmin);
router.get("/getAllAdminSubadminUsers",RouteCheckAuth , AdminUserController.getAllAdminSubadminUsers);
router.get("/singledata/:id",RouteCheckAuth ,AdminUserController.indvidualDetails);
router.get("/editdata/:id",RouteCheckAuth ,AdminUserController.EditDetails);
router.put("/update/:id",RouteCheckAuth ,AdminUserController.Update)
router.delete("/deleteAdminSubAdminUser/:id",RouteCheckAuth , AdminUserController.deleteAdminSubAdminUser);
router.get("/SearchAdminSubAdminUser/:searchTerm",RouteCheckAuth ,AdminUserController.SearchAdminSubAdminUser)
router.get("/registerUserParticularDate/:date",RouteCheckAuth ,AdminUserController.registerUserParticularDate)
router.get("/registerUserfromrDateTotodate/:fromdate/:todate",RouteCheckAuth ,AdminUserController.registerUserfromrDateTotodate);
router.get("/getAllSubAdminData",RouteCheckAuth ,AdminUserController.getAllSubAdminData);

router.get("/documentation",RouteCheckAuth ,AdminUserController.documents)
router.patch("/documentation",RouteCheckAuth ,AdminUserController.documents)

module.exports = router;
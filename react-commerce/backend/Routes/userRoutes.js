const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig");
const { Login, RegisterUser, AdminUserController,} = require("../Controller/userController");
const RouteCheckAuth = require("../Auth/RouteCheckAuth");
const {authenticate} = require("../Middleware/PassPort");

const registerusercontroller = new RegisterUser();
router.post("/register", upload.single("image"), (req, res) => {
  registerusercontroller.CreateRegisterAdminUser(req, res);
});
router.post("/login",Login);
router.get("/checkemail/:email", AdminUserController.checkEmail);
router.get("/checkmobile/:mobile", AdminUserController.Mobile);
router.get("/UniqueID/:unique_id", AdminUserController.checkUniqeID);
router.post("/passwordforgot/:email", AdminUserController.forgotPassword);
router.get("/countuser", AdminUserController.countUser);
router.get("/countadmin", AdminUserController.countAdmin);
router.get("/countsubadmin", AdminUserController.countSubAdmin);
router.get("/getAllAdminSubadminUsers", AdminUserController.getAllAdminSubadminUsers);
router.get("/singledata/:id",AdminUserController.indvidualDetails);
router.get("/editdata/:id",AdminUserController.EditDetails);
router.put("/update/:id",AdminUserController.Update)
router.delete("/deleteAdminSubAdminUser/:id", AdminUserController.deleteAdminSubAdminUser);
router.get("/SearchAdminSubAdminUser/:searchTerm",AdminUserController.SearchAdminSubAdminUser)
router.get("/registerUserParticularDate/:date",AdminUserController.registerUserParticularDate)
router.get("/registerUserfromrDateTotodate/:fromdate/:todate",AdminUserController.registerUserfromrDateTotodate);
router.get("/getAllSubAdminData",AdminUserController.getAllSubAdminData);
router.get("/documentation",AdminUserController.documents)

module.exports = router;
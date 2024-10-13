const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig");
const cmsController = require("../Controller/cmsPageController");
const RouteCheckAuth = require("../Auth/RouteCheckAuth");

router.get("/getAllCmss",RouteCheckAuth , cmsController.getAllPages);
router.put("/handlecmsstatus/:id",RouteCheckAuth , cmsController.updatePageStatus);
router.delete("/cmspagedelete/:id",RouteCheckAuth , cmsController.deletePage);
router.put("/cmsupdatepage/:id",RouteCheckAuth , upload.none(), cmsController.updatePage);
router.post("/cmsaddpage",RouteCheckAuth , upload.none(), cmsController.addPage);
router.get("/cmspageeditdata/:id",RouteCheckAuth , cmsController.getPageById);
router.get("/SearchCMSPageData/:searchTerm",RouteCheckAuth , cmsController.searchCMSData);

module.exports = router;
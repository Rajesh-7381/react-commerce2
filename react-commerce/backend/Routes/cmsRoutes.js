const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig");
const cmsController = require("../Controller/cmsPageController");

router.get("/getAllCmss", cmsController.getAllPages);
router.put("/handlecmsstatus/:id", cmsController.updatePageStatus);
router.delete("/cmspagedelete/:id", cmsController.deletePage);
router.put("/cmsupdatepage/:id", upload.none(), cmsController.updatePage);
router.post("/cmsaddpage", upload.none(), cmsController.addPage);
router.get("/cmspageeditdata/:id", cmsController.getPageById);
router.get("/SearchCMSPageData/:searchTerm", cmsController.searchCMSData);

module.exports = router;
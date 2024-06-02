const express = require("express");
const router = express.Router();
const upload=require("../utils/multerConfig");
const cmsController=require("../Controller/cmsPageController");

router.get("/cmspagedata",cmsController.getAllPages);
router.put("/handlecmspagestatus/:id",cmsController.updatePageStatus);
router.delete("/cmspagedelete/:id", cmsController.deletePage);
router.put("/cmsupdatepage/:id", upload.none(), cmsController.updatePage);
router.post("/cmsaddpage", upload.none(), cmsController.addPage);
router.get("/cmspageeditdata/:id", cmsController.getPageById);

module.exports=router;
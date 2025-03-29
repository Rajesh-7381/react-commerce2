const express=require("express");
const router=express.Router();
const upload=require("../utils/multerConfig");
const BannerController = require("../Controller/BannerController");
const RouteCheckAuth = require("../Auth/RouteCheckAuth");

router.post("/AddBanners",RouteCheckAuth ,upload.single("BannerImage"),BannerController.addBanner)
router.get("/getAllBanners",RouteCheckAuth ,BannerController.getAllBanners)
router.get("EditBannerDetails/:id" ,BannerController.getBannerById)
router.put("UpdateBanners/:id",RouteCheckAuth ,BannerController.updateBanner)
router.put("handlebannerstatus/:id",RouteCheckAuth ,BannerController.updateBannerStatus)
router.delete("/DeleteBanners/:id",RouteCheckAuth ,BannerController.deleteBanner)

module.exports=router;
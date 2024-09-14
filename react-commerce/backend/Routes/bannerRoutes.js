const express=require("express");
const router=express.Router();
const upload=require("../utils/multerConfig");
const BannerController = require("../Controller/BannerController");

router.post("/AddBanners",upload.single("BannerImage"),BannerController.addBanner)
router.get("/getAllBanners",BannerController.getAllBanners)
router.get("EditBannerDetails/:id",BannerController.getBannerById)
router.put("UpdateBanners/:id",BannerController.updateBanner)
router.put("handlebannerstatus/:id",BannerController.updateBannerStatus)
router.delete("/DeleteBanners/:id",BannerController.deleteBanner)

module.exports=router;
const express=require("express");
const router=express.Router();
const upload=require("../utils/multerConfig");
const brandController=require("../Controller/brandController")
const RouteCheckAuth = require("../Auth/RouteCheckAuth");

router.get("/getAllBrands",RouteCheckAuth ,brandController.getAllBrands)
router.get("/GetSingleBrandDetails/:id",RouteCheckAuth ,brandController.getBrandById)
router.put("/UpdateBrand/:id",RouteCheckAuth ,upload.fields([{ name: "brand_image", maxCount: 1 },{ name: "brand_logo", maxCount: 1 },]),brandController.updateBrand)
router.post("/AddBrand",RouteCheckAuth ,upload.fields([{ name: "brand_image", maxCount: 1 },{ name: "brand_logo", maxCount: 1 },]),brandController.addBrand)
router.get("/AllBrandCount",RouteCheckAuth ,brandController.brandCount)
router.delete("/branddelete/:id",RouteCheckAuth ,brandController.deleteBrand)
router.put("/handlebrandstatus/:id",RouteCheckAuth ,brandController.updateBrandStatus)
router.get("/SearchBrands/:searchTerm",RouteCheckAuth ,brandController.Search)
module.exports=router;
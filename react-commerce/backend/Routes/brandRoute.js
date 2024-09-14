const express=require("express");
const router=express.Router();
const upload=require("../utils/multerConfig");
const brandController=require("../Controller/brandController")

router.get("/getAllBrands",brandController.getAllBrands)
router.get("/GetSingleBrandDetails/:id",brandController.getBrandById)
router.put("/UpdateBrand/:id",upload.fields([{ name: "brand_image", maxCount: 1 },{ name: "brand_logo", maxCount: 1 },]),brandController.updateBrand)
router.post("/AddBrand",upload.fields([{ name: "brand_image", maxCount: 1 },{ name: "brand_logo", maxCount: 1 },]),brandController.addBrand)
router.get("/AllBrandCount",brandController.brandCount)
router.delete("/branddelete/:id",brandController.deleteBrand)
router.put("/handlebrandstatus/:id",brandController.updateBrandStatus)
router.get("/SearchBrands/:searchTerm",brandController.Search)
module.exports=router;
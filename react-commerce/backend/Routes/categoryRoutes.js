const express = require("express");
const router = express.Router();
const upload=require("../utils/multerConfig")
const categoryController=require("../Controller/categoryController");

router.get("/getAllCategorys",categoryController.getAll);
router.post("/addcategory",upload.single("category_image"),categoryController.create);
router.get("/categoryeditdata/:id",categoryController.categoryEditData);
router.put("/updatecategory/:id",upload.single("category_image"),categoryController.updateCategory);
router.delete("/categorydelete/:id",categoryController.categoryDelete);
router.put("/handlecategorystatus/:id",categoryController.updateCategoryStatus);
router.get("/uniquecategories",categoryController.uniqueCategories);
router.get("/categories",categoryController.categories2);
router.get("/parentcategory/:parentId",categoryController.parentCategory);
router.get("/SearchCategories/:searchTerm");

module.exports=router;
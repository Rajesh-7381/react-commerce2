const express = require("express");
const router = express.Router();
const upload=require("../utils/multerConfig")
const categoryController=require("../Controller/categoryController");
const RouteCheckAuth = require("../Auth/RouteCheckAuth");

router.get("/getAllCategorys",RouteCheckAuth ,categoryController.getAll);
router.post("/addcategory",RouteCheckAuth ,upload.single("category_image"),categoryController.create);
router.get("/categoryeditdata/:id",RouteCheckAuth ,categoryController.categoryEditData);
router.put("/updatecategory/:id",RouteCheckAuth ,upload.single("category_image"),categoryController.updateCategory);
router.delete("/categorydelete/:id",RouteCheckAuth ,categoryController.categoryDelete);
router.put("/handlecategorystatus/:id",RouteCheckAuth ,categoryController.updateCategoryStatus);
router.get("/uniquecategories",RouteCheckAuth ,categoryController.uniqueCategories);
router.get("/categories",RouteCheckAuth ,categoryController.categories2);
router.get("/parentcategory/:parentId",RouteCheckAuth ,categoryController.parentCategory);
router.get("/SearchCategories/:searchTerm",RouteCheckAuth );

module.exports=router;
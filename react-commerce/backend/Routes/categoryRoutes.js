const express = require("express");
const router = express.Router();

const categoryController=require("../Controller/categoryController");

router.get("/",categoryController.categories);
router.post("/add",categoryController.addCategory);
router.get("/:id",categoryController.categoryEditData);
router.put("/:id",categoryController.updateCategory);
router.delete("/:id",categoryController.categoryDelete);
router.put("/status/:id",categoryController.updateCategoryStatus);
router.get("/unique",categoryController.uniqueCategories);
router.get("/:ids",categoryController.categories2);
router.get("/parent/:parentId",categoryController.parentCategory);

module.exports=router;
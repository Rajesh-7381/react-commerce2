const express=require("express");
const router=express.Router();
const upload=require("../utils/multerConfig");
const productController=require("../Controller/productController");

router.get("/allproducts", productController.getAllProducts);
router.put("/updateproducts/:id", upload.single("product_video"), productController.updateProduct);
router.get("/productedit/:id", productController.getProductById);
router.delete("/productdelete/:id", productController.deleteProduct);
router.put("/updatestatus/:id", productController.updateProductStatus);
router.get("/productcolor", productController.getProductColors);
router.get("/allproductcount", productController.getProductCount);
router.post('/addproducts', upload.fields([{ name: 'product_video', maxCount: 1 }, { name: 'product_image', maxCount: 20 }]), productController.addProduct);
router.get("/productsimage", productController.getProductImages);
router.put("/handleproductsstatus/:id", productController.updateImageStatus);
router.delete("/productsimagedelete/:id", productController.deleteImage);

module.exports=router;
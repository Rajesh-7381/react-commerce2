const express=require("express");
const router=express.Router();
const upload=require("../utils/multerConfig");
const productController=require("../Controller/productController");

router.get("/getAllProducts", productController.getAllProducts);
router.get("/productedit/:id", productController.getProductById);
router.delete("/productdelete/:id", productController.deleteProduct);
router.put("/updateproducts/:id", upload.fields([{ name: 'product_video', maxCount: 1 }, { name: 'product_image', maxCount: 20 }]) ,productController.updateProduct);
router.get("/productcolor", productController.getProductColors);
router.get("/allproductcount", productController.getProductCount);
router.post('/addproducts', upload.fields([{ name: 'product_video', maxCount: 1 }, { name: 'product_image', maxCount: 20 }]), productController.addProduct);
router.get("/getAllproductsImages", productController.getProductImages);
router.put("/handleproductstatus/:id", productController.updateProductStatus);


router.delete("/ProductsImageDelete/:id", productController.deleteImage);
router.put("/handleproductImagesstatus/:id", productController.handleproductImagesstatus);
router.get("/editproductattributes/:id", productController.editproductattributes);
router.put("/handleproductImagesstatus/:id", productController.ProductAttributesStatusChange);
router.delete("/deleteattribute/:id", productController.deleteattribute);
router.get("/allproductsAttributes", productController.allproductsAttributes);
router.get("/SearchProducts/:searchTerm",productController.SearchProduct);
router.get("/ProductAttributesStatusChange/:id");

module.exports=router;
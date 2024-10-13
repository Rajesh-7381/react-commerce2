const express=require("express");
const router=express.Router();
const upload=require("../utils/multerConfig");
const productController=require("../Controller/productController");
const RouteCheckAuth = require("../Auth/RouteCheckAuth");

router.get("/getAllProducts",RouteCheckAuth , productController.getAllProducts);
router.get("/productedit/:id",RouteCheckAuth , productController.getProductById);
router.delete("/productdelete/:id",RouteCheckAuth , productController.deleteProduct);
router.put("/updateproducts/:id",RouteCheckAuth , upload.fields([{ name: 'product_video', maxCount: 1 }, { name: 'product_image', maxCount: 20 }]) ,productController.updateProduct);
router.get("/productcolor",RouteCheckAuth , productController.getProductColors);
router.get("/allproductcount",RouteCheckAuth , productController.getProductCount);
router.post('/addproducts',RouteCheckAuth , upload.fields([{ name: 'product_video', maxCount: 1 }, { name: 'product_image', maxCount: 20 }]), productController.addProduct);
router.get("/getAllproductsImages",RouteCheckAuth , productController.getProductImages);
router.put("/handleproductstatus/:id",RouteCheckAuth , productController.updateProductStatus);


router.delete("/ProductsImageDelete/:id",RouteCheckAuth , productController.deleteImage);
router.put("/handleproductImagesstatus/:id",RouteCheckAuth , productController.handleproductImagesstatus);
router.get("/editproductattributes/:id",RouteCheckAuth , productController.editproductattributes);
router.put("/handleproductImagesstatus/:id",RouteCheckAuth , productController.ProductAttributesStatusChange);
router.delete("/deleteattribute/:id",RouteCheckAuth , productController.deleteattribute);
router.get("/allproductsAttributes",RouteCheckAuth , productController.allproductsAttributes);
router.get("/SearchProducts/:searchTerm",RouteCheckAuth ,productController.SearchProduct);
router.get("/ProductAttributesStatusChange/:id",RouteCheckAuth );

module.exports=router;
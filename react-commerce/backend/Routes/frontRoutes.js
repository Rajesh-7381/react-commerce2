const express=require("express");
const router=express.Router();
const upload=require("../utils/multerConfig");
const frontController=require("../Controller/frontController")

router.post("/ContactUS",upload.none(),frontController.contactUs)
router.get("/AllProductDetailsShown",frontController.AllProductDetails)
router.get("/listingproduct",frontController.listingproduct)
router.get("/productDetails/:id",frontController.productDetails)
router.get("/productdetailscount",frontController.productdetailscount)
router.post("/create-payment-intent")
router.post("/cardData",upload.none(),frontController.Card);
router.post("/DeliveryAddress",upload.none(),frontController.DeliveryAddress);
router.get("/getAllCards",frontController.getAll);
router.post("/create-payment-intent",frontController.StripePayment);

module.exports=router
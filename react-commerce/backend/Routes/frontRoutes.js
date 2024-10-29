const express=require("express");
const router=express.Router();
const upload=require("../utils/multerConfig");
const frontController=require("../Controller/frontController")
const RouteCheckAuth = require("../Auth/RouteCheckAuth");

router.post("/ContactUS",RouteCheckAuth ,upload.none(),frontController.contactUs)
router.get("/AllProductDetailsShown" ,frontController.AllProductDetails)
router.get("/listingproduct",RouteCheckAuth ,frontController.listingproduct)
router.get("/productDetails/:id",RouteCheckAuth ,frontController.productDetails)
router.get("/productdetailscount",RouteCheckAuth ,frontController.productdetailscount)
router.post("/cardData",RouteCheckAuth ,upload.none(),frontController.Card);
router.post("/DeliveryAddress",RouteCheckAuth ,upload.none(),frontController.DeliveryAddress);
router.get("/getAllCards",RouteCheckAuth ,frontController.getAll);
router.post("/create-payment-intent",RouteCheckAuth ,frontController.StripePayment);
router.get("/getDeliveryAddress/:id",RouteCheckAuth ,frontController.getAdress)
router.delete("/deleteAddress/:id",RouteCheckAuth ,frontController.deleteAddress)

module.exports=router
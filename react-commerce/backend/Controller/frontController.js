const cardExpireCheck = require("../helper/cardExpireCheck");
const front = require("../Models/Front");
const luhnCheck = require("../utils/luhnCheck");
const { CardAdressSchema, DeliVeryAddressSchema } = require("../utils/Validation");

// controller
exports.contactUs = async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
    //   console.log(req.body);
      const result = await front.contactForm(name, email, subject, message);
      res.json({ message: "Query inserted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

exports.Card=async(req,res)=>{
  try {
    const combinedData={...req.body}
    const { error }=CardAdressSchema.validate(combinedData)

    if(error){
      return res.status(400).json({"message":"🚫 Invalid request body", error: error.details})
    }

    const { card_holder_name, card_number, card_expire, card_cvv } = req.body;
    // console.log(req.body)
    const isValidCardNumber= luhnCheck(card_number);
    // console.log(1)
    if(!isValidCardNumber){
      return res.status(400).json({ error: "Invalid card number: please check the card number and try again." });
    }

    const isValidCardExpire=await cardExpireCheck(card_expire,card_cvv);
    // console.log(1)
    if(!isValidCardExpire){
      return res.status(400).json({ error: "Invalid card expiration date: the card is either expired or the date is incorrect." });
    }

    const result=await front.createNewCard(card_holder_name, card_number, card_expire, card_cvv);
    // console.log(result)
    res.json({message:"card added successfully!"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAll=async(req,res)=>{
  try {
    const result=await front.getAllCards();
    res.json({message:"to fetch the all card",result})
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.DeliveryAddress=async(req,res)=>{
  // console.log(1)
  try {
    const combinedData = {
      ...req.body,
      
    };
    // console.log(2)
    const { error } = DeliVeryAddressSchema.validate(combinedData);
    // console.log(error)
    if (error) {
      return res
        .status(400)
        .json({ message: "🚫 Invalid request body", error: error.details });
    }
    // console.log(3)
    const { name,address,city,state,country,pincode ,mobile,secondaryMobile,user_id }=req.body;
    // console.log(req.body)
    const result=await front.DeliveryAddress(name,address,city,state,country,pincode ,mobile,secondaryMobile,user_id);
    // console.log(4)
    // console.log(result)
    res.json(result);
  } catch (error) {
      console.error(error)
      res.json({message:"internal server error"})
  }
};

exports.AllProductDetails=async(req,res)=>{
  // console.log(1)
  try {
    const result=await front.AllProductDetails();
    // console.log(1)
    res.json({result})
  } catch (error) {
      console.error(error);
      res.json({message:"internal server error"})
  }
};

exports.listingproduct=async(req,res)=>{
  try {
    const data=await front.listingproduct();
    return res.json(data)
  } catch (error) {
      console.error(error);
      res.json({message:"internal server error"})
  }
};

exports.productDetails=async(req,res)=>{
  const id=req.params.id;
  try {
    const result=await front.productDetails(id);
    res.json(result)
  } catch (error) {
      console.error(error);
      res.json({message:"internal server error"})
  }
};

exports.productdetailscount=async(req,res)=>{
  try {
    const data=await front.productdetailscount();
    return res.json(data)
  } catch (error) {
      console.error(error);
      res.json({message:"internal server error"}) 
  }
};
exports.StripePayment=async(req,res)=>{
  // console.log("s")
  try {
    const { amount, id } = req.body;
    // console.log(amount,id)

    const data=await front.StripePayment(amount);
    return res.json(data)
  } catch (error) {
      console.error(error);
      res.json({message:"internal server error"}) 
  }
};

exports.getAdress=async(req,res)=>{
  const id=req.params.id
  // console.log(id)
  try {
      const data=await front.getAdress(id);
      // console.log(getAdress)
      res.json(data)
  } catch (error) {
      console.error(error);
      res.json({message:"internal server error"}) 
  }
}
exports.deleteAddress=async(req,res)=>{
  const id=req.params.id
  // console.log(id)
  try {
      const data=await front.deleteAddress(id);
      // console.log(getAdress)
      res.json("Deleted Successfully!")
  } catch (error) {
      console.error(error);
      res.json({message:"internal server error"}) 
  }
}

  
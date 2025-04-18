const { db } = require("../config/dbconfig");
const { v4: uuidv4 } = require("uuid");
const UUID = uuidv4();
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)


const Front = {
  contactForm: (name, email, subject, message) => {
    const query =
      "INSERT INTO ContactUS (UUID,name, email, subject, message) VALUES (?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.query(query, [UUID, name, email, subject, message], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  createNewCard: (card_holder_name, card_number, card_expire, card_cvv) => {
    // console.log('Received data:', card_holder_name, card_number, card_expire, card_cvv);
    const query =
      "INSERT INTO card (card_holder_name, card_number, card_expire, card_cvv) VALUES (?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.query(
        query,
        [card_holder_name, card_number, card_expire, card_cvv],
        (err, data) => {
          if (err) {
            // console.log(err)
            reject(err);
          } else {
            // console.log(data)
            resolve(data);
          }
        }
      );
    });
  },
  getAllCards: () => {
    const query = "select * from card ";
    return new Promise((resolve, reject) => {
      db.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  DeliveryAddress: ( name, address,  city,  state,  country,  pincode,  mobile,  secondaryMobile,user_id) => {
    const query =
      "insert into DELIVERY_ADDRESS (name,UUID,address,city,state,country,pincode ,mobile,secondaryMobile,user_id) values(?,?,?,?,?,?,?,?,?,?)";
    return new Promise((resolve, reject) => {
      db.query(query,[  name,  UUID,  address,  city,  state,  country,  pincode,  mobile,  secondaryMobile,user_id],(err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  },
  AllProductDetails: () => {
    const query = "select b.brand_name,p.*,pi.image from products as p join products_image as pi on p.id=pi.product_id join brands as b on p.brand_id=b.id";
    // console.log(1)
    return new Promise((resolve, reject) => {
      db.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          // console.log(data)
          resolve(data);
        }
      });
    });
  },
  listingproduct: () => {
    const query =
      "select * from products as p join products_image as pi on p.id=pi.product_id  join product_attributes   where  p.status=1";
    return new Promise((resolve, reject) => {
      db.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  productDetails: (id) => {
    const query =
      "select p.*,pa.*,pi.*,c.* from products as p join product_attributes as pa on p.id=pa.product_id join products_image as pi on pi.product_id=p.id join categories as c on p.category_id=c.id where p.id=?";
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  productdetailscount:()=>{
    const query = "SELECT COUNT(id) AS total FROM products WHERE status=1"; 
    return new Promise((resolve,reject)=>{
      db.query(query,(err,data)=>{
        if(err){
          reject(err)
        }else{
          resolve(data)
        }
      })
    })
  },
  StripePayment: async (amount) => {
    // console.log("f")
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
          price_data: {
            currency: 'usd', //inr
            product_data: {
              name: 'Sample Product',
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });
      return { url: session.url };
    } catch (error) {
      return { error: error.message, };
    }
  },
  getAdress:async(id)=>{
    // console.log(id)
    try {
      const getAdressQuery="select * from DELIVERY_ADDRESS where user_id=?";
      return new Promise((resolve,reject)=>{
        db.query(getAdressQuery,[id],(err,data)=>{
          if(err){
            reject(err)
          }
          // console.log(data)
          resolve(data)
        })
      })
    } catch (error) {
        console.log(error)
    }
  },
  deleteAddress:async(id)=>{
    const query="delete from DELIVERY_ADDRESS where id=?";
    try {
      db.query(query,[id],(err,data)=>{
        if(err){
          console.log(err)
        }
        console.log(data)
      })
    } catch (error) {
      
    }
  }
};
module.exports = Front;

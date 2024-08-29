const { db } = require("../config/dbconfig");
const { v4: uuidv4 } = require("uuid");
const UUID = uuidv4();

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
  DeliveryAddress: (
    name,
    address,
    city,
    state,
    country,
    pincode,
    mobile,
    secondaryMobile
  ) => {
    const query =
      "insert into DELIVERY_ADDRESS (name,UUID,address,city,state,country,pincode ,mobile,secondaryMobile) values(?,?,?,?,?,?,?,?,?)";
    return new Promise((resolve, reject) => {
      db.query(
        query,
        [
          name,
          UUID,
          address,
          city,
          state,
          country,
          pincode,
          mobile,
          secondaryMobile,
        ],
        (err, data) => {
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
    const query =
      "select b.brand_name,p.*,pi.image from products as p join products_image as pi on p.id=pi.product_id join brands as b on p.brand_id=b.id";
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
  }
};
module.exports = Front;

const express = require("express");
const cors = require("cors");
// const mysql2=require("mysql2");
const passport = require('passport');
const session=require("express-session")
const GoogleOauthStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
// db
const { db } = require("./config/dbconfig");
// for multiple database
// const {db,db2}=require("./config/dbconfig");
require("dotenv").config(); //note.txt
const bodyParser = require("body-parser"); //note.txt
const path = require("path");
// image process
const sharp = require("sharp"); //The sharp library is a popular JavaScript library for image processing in Node.js. It provides a simple and efficient API for resizing, cropping, and transforming images in a variety of formats, including JPEG, PNG, WebP, and TIFF.
const morgan = require("morgan"); //note.txt
// const checkauth=require("./Auth/RouteCheckAuth");
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const ejs=require("ejs")

const checkAuth = require("./Auth/RouteCheckAuth");
const errhandler = require("./Middleware/ErrorHandler");
const { swaggerSpec }= require('./Swagger/swaggerConfig');
// for backend validation
const { CategorySchema, ProductSchema, BrandSchema, DeliVeryAddressSchema } = require("./utils/Validation");
// here multerConfig is roled to define file path also image where stored
const upload = require("./utils/multerConfig");
// const { default: Stripe } = require("stripe");
const userRoutes=require("./Routes/userRoutes")
const cmsRoutes=require("./Routes/cmsRoutes")
const categoryRoutes=require("./Routes/categoryRoutes")
const productRoutes=require("./Routes/productRoutes")
const bannerRoutes=require("./Routes/bannerRoutes")
const brandRoutes=require("./Routes/brandRoute")
const frontRoutes=require("./Routes/frontRoutes")


const app = express(); //create express.js(framework) instance

            // middleware
// setup session
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 20000 } // 24 hours session
}));

app.use(cors()); //enables Cross-Origin Resource Sharing (CORS) to allow requests from different origins.
app.use(express.json()); // parses incoming requests with JSON payloads.
// Use Morgan middleware for logging HTTP requests
// app.use(morgan("combined")); //logs HTTP requests in a concise format.

// bodyParser.json() and bodyParser.urlencoded({ extended: true }): parse incoming request bodies in JSON and URL-encoded formats, respectively.
app.use(bodyParser.json());  //Parses incoming JSON-formatted request bodies and makes them accessible on the req.body property of the request object.
app.use(bodyParser.urlencoded({ extended: true })); //Parses incoming URL-encoded request bodies and makes them accessible on the req.body property.
// The extended: true option enables parsing of nested objects and arrays, allowing for more complex data structures.

app.use(passport.session());

  passport.use(new GoogleOauthStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK, // Ensure this matches your Google Cloud Console
    scope: ["profile", "email"]
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // console.log(profile)
      const email = profile.emails[0].value;
      const userQuery = "SELECT * FROM AdminUser WHERE email = ?";
      const insertQuery = `INSERT INTO AdminUser (googleId,name, email, image, mobile, password) VALUES (?, ?, ?, ?, ?, ?)`;

      db.query(userQuery, [email], (err, results) => {
        if (err) {
          console.error('Error querying database: ', err);
          return done(err, null);
        }

        if (results.length > 0) {
          // User already exists
          return done(null, results[0]); //if user exist it show with user inforamtion
        } else {
          // User does not exist, create new user
          const user = {
            GoogleId:profile.id,
            name: profile.displayName,
            email: email,
            image: profile.photos[0] ? profile.photos[0].value : null,
            mobile: null, 
            password: null 
          };

          db.query(insertQuery, [user.GoogleId,user.name, user.email, user.image, user.mobile, user.password], (err, results) => {
            if (err) {
              console.error('Error inserting into database: ', err);
              return done(err, null);
            }

            // Add the newly created user ID to the `user` object
            user.id = results.insertId;
            return done(null, user);
          });
        }
      });
    } catch (error) {
      console.error('Error in passport strategy: ', error);
      return done(error, null);
    }
  }
  ));

  passport.serializeUser((user, done) => {
  done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
  const query = "SELECT * FROM AdminUser WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return done(err, null);
    }
    return done(null, results[0]);
  });
  });

// for facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:8081/auth/facebook/callback", 
  profileFields: ['id', 'displayName', 'emails', 'photos'] 
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    const userQuery = "SELECT * FROM AdminUser WHERE email = ?";
    const insertQuery = `INSERT INTO AdminUser (name, email, image, mobile, password) VALUES (?, ?, ?, ?, ?)`;

    db.query(userQuery, [email], (err, results) => {
      if (err) {
        console.error('Error querying database: ', err);
        return done(err, null);
      }

      if (results.length > 0) {
        // User already exists
        return done(null, results[0]);
      } else {
        // User does not exist, create new user
        db.query(insertQuery, [profile.displayName, email, profile.photos[0].value, null, null], (err, results) => {
          if (err) {
            console.error('Error inserting into database: ', err);
            return done(err, null);
          }
          
          // Return the newly created user object
          const newUser = {
            id: results.insertId,
            name: profile.displayName,
            email: email,
            image: profile.photos[0].value,
            mobile: null, // Default value since mobile is not provided by Facebook
            password: null // Default value for password
          };

          return done(null, newUser);
        });
      }
    });
  } catch (error) {
    console.error('Error in passport strategy: ', error);
    return done(error, null);
  }
}
));

passport.serializeUser((user, done) => {
done(null, user.id);
});

passport.deserializeUser((id, done) => {
const query = "SELECT * FROM AdminUser WHERE id = ?";
db.query(query, [id], (err, results) => {
  if (err) {
    return done(err, null);
  }
  return done(null, results[0]);
});
});


// Serve static files for profile images
// express.static :: is built in middleware function in  express that serves static files. It takes a directory path as an argument and serves the files within that directory
// path.join() is a method from Node.js's path module. It joins the provided path segments into a single path string.
// __dirname is a Node.js global variable that represents the directory name of the current 
app.use("/profile", express.static(path.join(__dirname, "uploads/profile")));

// Serve static files for product video
app.use("/products", express.static(path.join(__dirname, "uploads/products")));

// Serve static files for category images
app.use(
  "/CategoryImage",
  express.static(path.join(__dirname, "uploads/categories"))
);
// Serve static files for product images
// for image showing in frontend
app.use(
  "/productsimage",
  express.static(path.join(__dirname, "uploads/productImages/medium"))
);

// for brand image
app.use(
  "/brandimage",
  express.static(path.join(__dirname, "uploads/Brands/BrandImage"))
);
// for brand logo
app.use(
  "/brandlogo",
  express.static(path.join(__dirname, "uploads/Brands/BrandLogo"))
);

// for banner
app.use(
  "/bannerImage",
  express.static(path.join(__dirname, "uploads/banners"))
);

app.use(errhandler);

app.use(passport.initialize());
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000/userdashboard2'); // Redirect to homepage or another page after successful login
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Handle the callback after Facebook has authenticated the user
app.get('/auth/facebook/callback',passport.authenticate('facebook'),(req,res)=>{
  res.redirect('http://localhost:3000/userdashboard2');
});

// function makeid(length) {
//   let result = '';
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const charactersLength = characters.length;
//   let counter = 0;
//   while (counter < length) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     counter += 1;
//   }
//   return result.toUpperCase();       
// }

// var randomoutput=makeid(15);
// const num=Math.floor(Math.random() * 1000000);
// console.log(randomoutput +num)

//=============================================== register ,login============================
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use("/api",userRoutes)//re gister and login and check email and check mobile
app.use("/api",cmsRoutes) //cms api
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",brandRoutes)
app.use("/api",bannerRoutes)
app.use("/api",frontRoutes)


app.set('view engine','ejs')
app.set('vviews','../views/index')
app.get("/",(req,res)=>{
  const data = {
    username: 'Rajesh!',
    date: new Date().toDateString(),
    Swagger: 'http://localhost:8081/api-docs'
  };
  
  res.render('index',data)
})

// update categories
app.put("/updatecategory/:id", upload.single("category_image"), (req, res) => {
  const combinedData = { ...req.body, category_image: req.file };
  const { error } = CategorySchema.validate(combinedData);
  if (error) {
    return res
      .status(400)
      .json({ message: "Invalid request body!", error: error.details });
  }
  const id = req.params.id;
  const category_image = req.file.filename;
  const {
    category_name,
    parent_id,
    category_discount,
    description,
    url,
    meta_title,
    meta_description,
    meta_keyword,
  } = req.body;
  const query =
    "UPDATE categories SET category_name=?, parent_id=?, category_image=?, category_discount=?, description=?, url=?, meta_title=?, meta_description=?, meta_keyword=? WHERE id=?";
  db.query(
    query,
    [
      category_name,
      parent_id,
      category_image,
      category_discount,
      description,
      url,
      meta_title,
      meta_description,
      meta_keyword,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("🚫 " + err);
        return res.status(500).json({ message: "🚫 Internal server error" });
      }
      return res.status(200).json({ message: "✅ Update successful!" });
    }
  );
});


app.put(
  "/updateproducts/:id",
  upload.fields([
    { name: "product_video", maxCount: 1 },
    { name: "product_image", maxCount: 20 },
  ]),
  async (req, res) => {
    const combinedData = {
      ...req.body,
      product_video: req.files["product_video"] ? req.files["product_video"][0] : null,
      product_image: req.files["product_image"] ? req.files["product_image"][0] : [],
    };
    const { error } = ProductSchema.validate(combinedData);
    if (error) {
      return res
        .status(400)
        .json({ message: "🚫 Invalid request body!", error: error.details });
    }

    const id = req.params.id;
    const product_video = req.file.filename;
    const {
      category_id,
      brand_id,
      product_name,
      product_code,
      product_color,
      family_color,
      group_code,
      product_price,
      product_weight,
      product_discount,
      discount_type,
      final_price,
      description,
      washcare,
      keywords,
      fabric,
      pattern,
      sleeve,
      fit,
      meta_keywords,
      meta_description,
      meta_title,
      occassion,
      is_featured,
    } = req.body;
    // console.log(req.body)
    const query =
      "UPDATE products SET category_id=?, product_name=?, product_code=?,product_color=?, family_color=?, group_code=?, product_price=?, product_weight=?, product_discount=?, discount_type=?, final_price=?,product_video=?, description=?, washcare=?, keywords=?, fabric=?, pattern=?, sleeve=?, fit=?, meta_keywords=?, meta_description=?, meta_title=?, occassion=?, is_featured=? WHERE id=?";
    db.query(
      query,
      [
        category_id,
        brand_id,
        product_name,
        product_code,
        product_color,
        family_color,
        group_code,
        product_price,
        product_weight,
        product_discount,
        discount_type,
        final_price,
        product_video,
        description,
        washcare,
        keywords,
        fabric,
        pattern,
        sleeve,
        fit,
        meta_keywords,
        meta_description,
        meta_title,
        occassion,
        is_featured,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("🚫 " + err);
          return res.status(500).json({ message: "🚫 Internal Server Error" });
        }
        return res.status(200).json({ message: "✅ Updated successfully!" });
      }
    );
  }
);

app.put(
  "/UpdateBrand/:id",
  upload.fields([
    { name: "brand_image", maxCount: 1 },
    { name: "brand_logo", maxCount: 1 },
  ]),
  async (req, res) => {
    const combinedData = {
      ...req.body,
      brand_image: req.files["brand_image"][0],
      brand_logo: req.files["brand_logo"][0],
    };
    const { error } = BrandSchema.validate(combinedData);
    if (error) {
      return res
        .status(400)
        .json({ message: "Invalid request body!", error: error.details });
    }

    const id = req.params.id;
    console.log(id);
    const brand_image = req.files["brand_image"][0].filename;
    const brand_logo = req.files["brand_logo"][0].filename;
    const query =
      "update brands brand_name=?,brand_image=?,brand_logo=?,brand_discount=?,description=?,url=?,meta_title=?,meta_description=?,meta_keyword=? where id=?";
    db.query(query, [id], (err, data) => {
      if (err) {
        console.log("🚫 " + err);
      }
      return res
        .status(200)
        .json({ message: "✅ Brand Updated Successfully!" });
    });
  }
);

app.get("/AllProductDetailsShown",(req,res)=>{
  // const query="select p.*,pi.image from products as p join products_image as pi on p.id=pi.product_id where p.status=1";
  const query="select b.brand_name,p.*,pi.image from products as p join products_image as pi on p.id=pi.product_id join brands as b on p.brand_id=b.id";
  db.query(query,(err,data)=>{
    if(err){
      console.log(err);
    }
    return res.json(data)
  })
});


// show single listing data
app.get("/listingproduct",(req,res)=>{
  // const id=req.params.id;
  // console.log(id)
  const query="select * from products as p join products_image as pi on p.id=pi.product_id  join product_attributes   where  p.status=1";
  db.query(query,(err,data)=>{
    if(err){
      console.log(err);
    }
    return res.json(data);
  })
});
// show single listing data
app.get("/productDetails/:id",(req,res)=>{
  const id=req.params.id;
  // console.log(id)
  const query="select p.*,pa.*,pi.*,c.* from products as p join product_attributes as pa on p.id=pa.product_id join products_image as pi on pi.product_id=p.id join categories as c on p.category_id=c.id where p.id=?";
  db.query(query,[id],(err,data)=>{
    if(err){
      console.log(err);
    }
    return res.json(data);
  })
});


app.get("/productdetailscount", (req, res) => {
  const query = "SELECT COUNT(id) AS total FROM products WHERE status=1"; 
  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "🚫 Internal server error" });
    } else {
      const count = data[0].total; 
      res.json({
        count: count,
      });
    }
  });
});

// for stripe
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, id } = req.body;
    // console.log(amount,id)
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

    res.json({ url:session.url });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

// DeliveryAddress
app.post("/DeliveryAddress",(req,res)=>{
  const combinedData = {
    ...req.body,
    
  };
  const { error } = DeliVeryAddressSchema.validate(combinedData);
  if (error) {
    return res
      .status(400)
      .json({ message: "🚫 Invalid request body", error: error.details });
  }
  console.log(error)
  const { name,address,city,state,country,pincode ,mobile,secondaryMobile }=req.body;
  console.log(req.body)
  const uuid=uuidv4();
  const query="insert into DELIVERY_ADDRESS (name,UUID,address,city,state,country,pincode ,mobile,secondaryMobile) values(?,?,?,?,?,?,?,?,?)";
  db.query(query,[name,uuid,address,city,state,country,pincode,mobile,secondaryMobile],(err,data)=>{
    if(err){
      console.log(err)
    
    }
    return res.json({data})
    
  })
  return res.status(200).json({ message: "✅ Delivery Address Added successfully!" });
})

app.listen(process.env.SERVERPORT, () => {
  console.log(`server listening at port http://localhost:${process.env.SERVERPORT}`);
  console.log(`Swagger UI is available at http://localhost:${process.env.SERVERPORT}/api-docs`);
});

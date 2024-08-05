const express = require("express");
const cors = require("cors");
// const mysql2=require("mysql2");
const {  Sendmail } =require("./utils/email")
const passport = require('passport');
const session=require("express-session")
const GoogleOauthStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
// db
const { db } = require("./config/dbconfig");
const errhandler = require("./Middleware/ErrorHandler");
const { DatabaseError } = require("./Error/AppError");
const { cloudinary }=require("./helper/cloudinaryConfig")
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
// for backend validation
const {
  registerSchema,
  passwordForgotSchema,
  CmsPageSchema,
  CategorySchema,
  ProductSchema,
  BrandSchema,
  BannerSchema,
} = require("./utils/Validation");
// for multiple database
// const {db,db2}=require("./config/dbconfig");

require("dotenv").config(); //note.txt
// for hashing password
const bcrypt = require("bcrypt");
// for file uploading
const multer = require("multer");
// for file date
const moment = require("moment"); //moment library working with date and times
const bodyParser = require("body-parser"); //note.txt
const path = require("path");
const jwt = require("jsonwebtoken"); //note.txt
// image process
const sharp = require("sharp"); //The sharp library is a popular JavaScript library for image processing in Node.js. It provides a simple and efficient API for resizing, cropping, and transforming images in a variety of formats, including JPEG, PNG, WebP, and TIFF.
const morgan = require("morgan"); //note.txt
const transpoter = require("./Email/nodemailerConfig");
// const checkauth=require("./Auth/RouteCheckAuth");
// for file sysytem
const fs = require("fs");
const checkAuth = require("./Auth/RouteCheckAuth");

// here multerConfig is roled to define file path also image where stored
const upload = require("./utils/multerConfig");
const { promises } = require("dns");
const { profile, count } = require("console");
const { UUID } = require("./utils/UserIID");
// const { default: Stripe } = require("stripe");
const app = express(); //create express.js(framework) instance

// setup session
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours session
}));


app.use(passport.session());

  passport.use(new GoogleOauthStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8081/auth/google/callback", // Ensure this matches your Google Cloud Console
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

// middleware
app.use(cors()); //enables Cross-Origin Resource Sharing (CORS) to allow requests from different origins.
app.use(express.json()); // parses incoming requests with JSON payloads.
// Use Morgan middleware for logging HTTP requests
// app.use(morgan("combined")); //logs HTTP requests in a concise format.

// bodyParser.json() and bodyParser.urlencoded({ extended: true }): parse incoming request bodies in JSON and URL-encoded formats, respectively.
app.use(bodyParser.json());  //Parses incoming JSON-formatted request bodies and makes them accessible on the req.body property of the request object.
app.use(bodyParser.urlencoded({ extended: true })); //Parses incoming URL-encoded request bodies and makes them accessible on the req.body property.
// The extended: true option enables parsing of nested objects and arrays, allowing for more complex data structures.

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

// for uuid
// const id=uuidv4()
// console.log(id)
// const num=Math.floor(Math.random() * 1000000);
// console.log(num)

//=============================================== register user data============================

  app.post("/register", upload.single("image"), async (req, res) => {
    const combinedData = {
      ...req.body,
      image: req.file,
    };
    const { error } = registerSchema.validate(combinedData);
    if (error) {
      return res
        .status(400)
        .json({ message: "🚫 Invalid request body", error: error.details });
    }

    const { name, mobile, email, password } = req.body;
    // generate unique uuid
    const uuid=await UUID();
    
    const UserExistQuery =
      "SELECT COUNT(*) AS count FROM AdminUser WHERE email = ? OR mobile = ?";

    try {
      // Check if the user already exists
      const userExistsResult = await new Promise((resolve, reject) => {
        db.query(UserExistQuery, [email, mobile], (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results[0].count);
        });
      });

      if (userExistsResult > 0) {
        return res
          .status(400)
          .json({ message: "🚫 Email or mobile number already exists" });
      }

      // Proceed with user registration
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      if(req.file){
        const uploadImagePath=await cloudinary.uploader.upload(req.file.path)
        await new Promise((resolve, reject) => {
          db.query(
            "INSERT INTO AdminUser (name, mobile, email, password, image,UUID) VALUES (?, ?, ?, ?, ?,?)",
            [
              name,
              mobile,
              email,
              hashedPassword,
              req.file ? uploadImagePath.secure_url : null,
              uuid,
            ],
            (err, results) => {
              if (err) {
                return reject(err);
              }
              resolve(results);
            }
          );
        });
      }
      
      await Sendmail(email, "Welcome to E-commerce", `Hi ${name}, thank you for registering.`);

      res.json({ message: "✅ User created successfully!" });
    } catch (err) {
      console.error("🚫 Error submitting form", err);
      res.status(500).json({ message: "🚫 Internal server error" });
    }
  });


//========================================END====================================================

//===============================================ADMIN OR SUBADMIN USER LOGIN============================
app.post("/login", (req, res, next) => {
  const { email, password, check } = req.body;
  // console.log(req.body)
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: 0, message: "Email and password are required" });
  }

  const query = "SELECT * FROM AdminUser WHERE email = ?";
  db.query(query, [email], async (err, data) => {
    if (err) {
      console.error("Login unsuccessful:", err);
      return res
        .status(500)
        .json({ status: 0, message: "🚫 Internal server error" });
    }

    if (data.length === 0) {
      return res
        .status(401)
        .json({ status: 0, message: "Invalid email or password" });
    }

    const user = data[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res
        .status(401)
        .json({ status: 0, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role, id: user.id },
      // 'dummy text',
      process.env.JWT_SECRET,
      // { expiresIn: check ? '7d' : process.env.JWT_EXPIRATION }
      { expiresIn: "24h" }
    );

    // console.log('Generated Token:', token); // Log the generated token for debugging
    // console.log('Secret Key:', process.env.JWT_SECRET); // Log the JWT secret key for debugging

    res.status(200).json({
      status: 1,
      message: "Login successful",
      email: user.email,
      role: user.role,
      id: user.id,
      token: token,
    });
  });
});

//========================================END====================================================

//===============================================// forgot password before check email already exist in database or not and registering time to check this email is already exists or not============================

app.get("/checkemail/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const query = "SELECT * FROM AdminUser WHERE email=?";
    const result = await db.promise().query(query, [email]);

    const emailExists = result[0].length > 0;
    res.json({ emailExists });
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//========================================END====================================================

//===============================================Mobile exist check============================
app.get("/checkmobile/:mobile", async (req, res) => {
  try {
    const mobile = req.params.mobile;
    const query = "SELECT * FROM AdminUser WHERE mobile =?";
    const result = await db.promise().query(query, [mobile]);

    const mobileExists = result[0].length > 0;
    res.json({ mobileExists });
  } catch (error) {
    console.error("Error checking mobile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//========================================END====================================================

//===============================================forgotting password============================

const saltRounds = parseInt(process.env.SALTROUNDS);
app.post("/passwordforgot/:email", async (req, res) => {
  const { error } = passwordForgotSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "🚫 invalid request body", error: error.details });
  }
  const email = req.params.email;
  const newPassword = req.body.password;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    const query = "UPDATE AdminUser SET password=? WHERE email=?";
    db.query(query, [hashedNewPassword, email], (err, result) => {
      if (err) {
        console.error("🚫 Internal server error");
        return res.status(500).json({ error: "🚫 Internal server error" });
      }
      return res
        .status(200)
        .json({ message: "✅ Password updated successfully!" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "🚫 Internal server error" });
  }
});

//========================================END====================================================

//===============================================// count user============================

app.get("/countuser", (req, res) => {
  const query = "SELECT COUNT(id) AS total FROM AdminUser where role='user'"; // Alias 'count(id)' as 'total'
  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "🚫 Internal server error" });
    } else {
      const count = data[0].total; // Access using the alias 'total'
      // const count2 = data[0].email; // Access using the alias 'total'
      // console.log("Total Users:", count);
      res.json({
        count: count,
      });
    }
  });
});

//========================================END====================================================

//===============================================// count admin============================

app.get("/countadmin", (req, res) => {
  const query = "SELECT COUNT(id) AS total FROM AdminUser where role='admin'"; // Alias 'count(id)' as 'total'
  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "🚫 Internal server error" });
    } else {
      const Admincount = data[0].total; // Access using the alias 'total'
      // const count2 = data[0].email; // Access using the alias 'total'
      // console.log("Total Users:", count);
      res.json({
        Admincount: Admincount,
      });
    }
  });
});

//========================================END====================================================

//===============================================d// subadmin count============================
// subadmin count
app.get("/countsubadmin", (req, res) => {
  const query =
    "SELECT COUNT(id) AS total FROM AdminUser where role='subadmin'"; // Alias 'count(id)' as 'total'
  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "🚫Internal server error" });
    } else {
      const subaAdmincount = data[0].total; // Access using the alias 'total'
      // const count2 = data[0].email; // Access using the alias 'total'
      // console.log("Total Users:", count);
      res.json({
        subaAdmincount: subaAdmincount,
      });
    }
  });
});

//========================================END====================================================

//===============================================// show all user data============================

app.get("/getAllAdminSubadminUsers", (req, res) => {
  const sql = "SELECT * FROM AdminUser where deleted_at is null";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json({ message: "🚫 Internal server error" });
    }
    return res.json(data);
  });
});

//========================================END====================================================

//===============================================// show one user data============================

app.get("/singledata/:id", (req, res) => {
  const id = req.params.id;

  const query = "select * from AdminUser where id=?";
  db.query(query, id, (err, result) => {
    if (err) {
      console.error("🚫 error fetching data", err);
      return res.status(500).json({ message: "🚫 internal server error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "🚫 data not found!" });
    }
    return res
      .status(200)
      .json({ message: "✅ data fetched successfully!", data: result[0] });
  });
});

//========================================END====================================================

//===============================================Editdata============================

app.get("/editdata/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const query = "select * from AdminUser where id=?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("🚫 error fetching data", err);
      return res.status(500).json({ message: "🚫 internal server error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "🚫 data not found!" });
    }
    return res
      .status(200)
      .json({ message: "✅ data fetched successfully!", data: result[0] });
  });
});

//========================================END====================================================

//===============================================Add update user endpoint============================

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id)
  const { name, mobile, email, password, role } = req.body;
  const query =
    "UPDATE AdminUser SET name=?, mobile=?, email=?, password=?, role=? WHERE id=?";

  db.query(query, [name, mobile, email, password, role, id], (err, result) => {
    if (err) {
      console.error("🚫 Error updating data", err);
      return res.status(500).json({ message: "🚫 Internal server error" });
    }
    return res.status(200).json({ message: "✅ Data updated successfully!" });
  });
});

//========================================END====================================================

//===============================================delete functionality============================

app.delete("/deleteAdminSubAdminUser/:id", (req, res) => {
  const id = req.params.id;
  const query =
    "UPDATE AdminUser SET deleted_at = CURRENT_TIMESTAMP WHERE id=?";
  db.query(query, id, (err, result) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json({ message: "🚫 internal server error" });
    }
    return res.status(200).json({ message: "✅ deleted sucessfully!" });
  });
});

//========================================END====================================================

//=============================================== status change============================

app.get("/SearchAdminSubAdminUser/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const query = "SELECT * FROM AdminUser WHERE name LIKE? OR email LIKE?";
  db.query(query, [`%${searchTerm}%`, `%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error("🚫 Error searching for users", err);
      res.status(500).json({ error: "🚫 internal Server Error" });
      return;
    }
    res.json(results);
  });
});

//========================================END====================================================

//===============================================particular date through user data show============================

app.get("/registerUserParticularDate/:date", (req, res) => {
  const date = req.params.date;
  // console.log(date)
  // const formattedDate = date.split('-').reverse().join('-');
  // console.log(formattedDate)

  // here issue is created_at stored date time format but i want to show date format thats why we use  'CAST' or 'DATE_FORMAT'
  // const query="SELECT COUNT(*) AS count FROM AdminUser WHERE role='user' AND CAST(created_at AS DATE) = ?";
  const query =
    "SELECT * FROM AdminUser WHERE role='user' and date(created_at) = ?";
  db.query(query, [date], (err, data) => {
    // db.query(query, [formattedDate], (err, data) => {
    if (err) {
      console.error("🚫 " + err);
      res.status(500).json({ message: "🚫 Internal server error" });
    } else {
      // console.log(data)
      res.json({
        count:data.length,
        data:data
      });
    }
  });
});

// particular date and show data
app.get("/registerUserPartCularDateWithDeails/:date",(req,res)=>{
  const date=req.params.date;
})
//========================================END====================================================

//===============================================// from date to to date through user data show============================

app.get("/registerUserfromrDateTotodate/:fromdate/:todate", (req, res) => {
  const fromdate = req.params.fromdate;
  const todate = req.params.todate;

  const query =
    "SELECT COUNT(*) AS count FROM AdminUser WHERE created_at BETWEEN ? AND ?";
  db.query(query, [fromdate, todate], (err, data) => {
    if (err) {
      console.error("🚫 " + err);
      res.status(500).json({ message: "🚫 Internal server error" });
    } else {
      res.json(data[0]);
    }
  });
});

//========================================END====================================================

//===============================================// subadmins see all subadmins and user data============================

app.get("/getAllSubAdminData", (req, res) => {
  const query = "select * from  AdminUser where role in('subadmin' ,'user')";
  db.query(query, (err, result) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json({ message: "🚫 internal server error" });
    }
    // return res.status(200).json({message:"data get successfully!"})
    return res.json(result);
  });
});

//========================================END====================================================

//===============================================// GET ALL cms page data============================

app.get("/getAllCmss", (req, res) => {
  const query = "select * from cmspages where deleted_at is null";
  db.query(query, (err, data) => {
    if (err) {
      console.error("🚫 " + err);
    }
    return res.json(data);
  });
});

//========================================END====================================================

//===============================================// cms page staus changee============================

app.put("/handlecmsstatus/:id", (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const query = "update cmspages set status=? where id =?";
  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json({ message: "🚫 Internal server error" });
    }
    return res.status(200).json({ message: "✅ status updated successfully!" });
  });
});

//========================================END====================================================

//===============================================DELETE CMS PAGE DATA============================

app.delete("/cmsdelete/:id", (req, res) => {
  const id = req.params.id;
  const query = "update cmspages set deleted_at=CURRENT_TIMESTAMP where id=?";
  db.query(query, id, (err, result) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json({ message: "🚫 internal server error" });
    }
    return res.status(200).json({ message: "✅ Deleted successfully!" });
  });
});

//========================================END====================================================

//===============================================UPDATE CMS PAGE DATA============================
// update cmspage
app.put("/cmsupdatepage/:id", upload.none(), (req, res) => {
  const { error } = CmsPageSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Invalid Request body!", error: error.details });
  }
  const id = req.params.id;
  const {
    title,
    url,
    description,
    meta_title,
    meta_keywords,
    meta_description,
  } = req.body;

  const query =
    "UPDATE cmspages SET title=?, url=?, description=?, meta_title=?, meta_keywords=?, meta_description=? WHERE id =?";
  db.query(
    query,
    [title, url, description, meta_title, meta_keywords, meta_description, id],
    (err, result) => {
      if (err) {
        console.error("🚫 " + err);
        return res.status(500).json({ message: "🚫 Internal server error" });
      }
      return res.status(200).json({ message: "✅ Update successful" });
    }
  );
});

//========================================END====================================================

//===============================================ADD CMS PAGE DATA============================
// add cms pages
app.post("/cmsaddpage", upload.none(), (req, res) => {
  const { error } = CmsPageSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Invalid Request body!", error: error.details });
  }
  const {
    title,
    url,
    description,
    meta_title,
    meta_keywords,
    meta_description,
  } = req.body;

  const query =
    "INSERT INTO cmspages (title, url, description, meta_title, meta_keywords, meta_description) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [title, url, description, meta_title, meta_keywords, meta_description],
    (err, result) => {
      if (err) {
        console.error("🚫 " + err);
        return res.status(500).json({ message: "🚫 Internal server error" });
      }
      return res.status(200).json({ message: "✅ Insertion successful" });
    }
  );
});

//========================================END====================================================

//===============================================EDIT CMS PAGE DATA============================
// cms edit data
app.get("/cmspageeditdata/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM cmspages WHERE id=?";
  db.query(query, id, (err, result) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json({ message: "🚫 Internal server error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "🚫 Data not found!" });
    }
    return res.status(200).json({ data: result[0] });
  });
});

//========================================END====================================================

//===============================================SEARCH CMS PAGE DATA============================
// for searching
app.get("/SearchCMSPageData/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const query = "SELECT * FROM cmspages WHERE title LIKE? OR url LIKE?";
  db.query(query, [`%${searchTerm}%`, `%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error("🚫 Error searching for cmsdata", err);
      res.status(500).json({ error: "🚫 internal Server Error" });
      return;
    }
    res.json(results);
  });
});

//========================================END====================================================

//===============================================GET ALL CATEGORYS============================
// FOR CATEGORIES
app.get("/getAllCategorys", (req, res) => {
  const query = "SELECT * FROM categories WHERE deleted_at IS NULL";
  db.query(query, (err, data) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json({ message: "🚫 Internal server error" });
    }
    return res.json(data);
  });
});

//========================================END====================================================

//===============================================delete status change============================
// add category
app.post("/addcategory", upload.single("category_image"), (req, res) => {
  const combinedData = { ...req.body, category_image: req.file };
  const { error } = CategorySchema.validate(combinedData);
  if (error) {
    return res
      .status(400)
      .json({ message: "🚫 Invalid request body!", error: error.details });
  }

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
  const category_image = req.file.filename;
  const query =
    "INSERT INTO categories (category_name,parent_id,category_image, category_discount, description, url, meta_title, meta_description, meta_keyword) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)";
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
    ],
    (err, result) => {
      if (err) {
        console.error("🚫 " + err);
        res.status(500).json({ error: "🚫Internal server error" });
        return;
      }
      res.status(200).json({ message: "✅ Data inserted successfully!" });
    }
  );
});

//========================================END====================================================

//===============================================delete status change============================
// category single data
app.get("/categoryeditdata/:id", (req, res) => {
  const id = req.params.id;
  const query = "select * from categories where id=?";
  db.query(query, id, (err, result) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json({ message: "🚫 internal server error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "🚫data not found!" });
    }
    const data = {
      ...result[0],
      category_image: `http://localhost:8081/uploads/categories/${result[0].category_image}`,
    };
    // console.log(data)
    return res.status(200).json({ message: "✅ data fetched!", data });
  });
});

//========================================END====================================================

//===============================================delete status change============================
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

//========================================END====================================================

//===============================================delete status change============================
// delete category
app.delete("/categorydelete/:id", (req, res) => {
  const id = req.params.id;
  const query =
    "UPDATE categories SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?";
  db.query(query, id, (err, result) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json({ message: "🚫 Internal server error" });
    }
    return res.status(200).json({ message: "✅ Data deleted successfully!" });
  });
});

//========================================END====================================================

//===============================================delete status change============================
// update category status
app.put("/handlecategorystatus/:id", (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const query = "UPDATE categories SET status = ? WHERE id = ?";
  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json({ message: "🚫 Internal server error" });
    }
    return res.status(200).json({ message: "✅ Status updated successfully!" });
  });
});

//========================================END====================================================

//===============================================delete status change============================
// count distinct  categories
app.get("/uniquecategories", (req, res) => {
  const query = "SELECT COUNT(DISTINCT category_name) AS total FROM categories";
  db.query(query, (err, data) => {
    if (err) {
      console.error("🚫 " + err);
      res.status(500).json({ error: "🚫 Internal server error" });
    } else {
      const catcount = data[0].total;
      res.json({ catcount: catcount });
    }
  });
});

//========================================END====================================================

//===============================================delete status change============================
app.get("/SearchCategories/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const query =
    "SELECT * FROM categories WHERE category_name LIKE? OR url LIKE? OR  meta_title LIKE?";
  db.query(
    query,
    [`%${searchTerm}%`, `%${searchTerm}%`, `%${searrchTerm}%`],
    (err, results) => {
      if (err) {
        console.error("🚫 Error searching for categories", err);
        res.status(500).json({ error: "🚫 internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});

//========================================END====================================================

//===============================================delete status change============================
app.get("/parentcategory/:parentId", (req, res) => {
  const parentId = req.params.parentId;
  const query =
    "SELECT category_name FROM categories WHERE id = ? AND deleted_at IS NULL";
  db.query(query, parentId, (err, data) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json({ message: "🚫 Internal server error" });
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "🚫 Parent category not found" });
    }
    return res.json(data[0]);
  });
});

// all products data
app.get("/getAllProducts", (req, res) => {
  const query = `
    SELECT  p.*,  c.category_name AS category_name, pc.category_name AS parent_category_name
    FROM products p LEFT JOIN  categories c ON p.category_id = c.id LEFT JOIN 
      categories pc ON c.parent_id = pc.id WHERE p.deleted_at IS NULL `;
  db.query(query, (err, data) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json({ error: "🚫 Internal Server Error" });
    }
    // Map through the data to replace null category_name and parent_category_name with 'No Category' and 'No Parent Category' respectively
    const products = data.map((product) => ({
      ...product,
      category_name: product.category_name || "No Category",
      parent_category_name:
        product.parent_category_name || "No Parent Category",
    }));
    return res.json(products);
  });
});

//========================================END====================================================

//===============================================Add PRODUCT============================


app.post(
  "/addproducts",
  upload.fields([
    { name: "product_video", maxCount: 1 },
    { name: "product_image", maxCount: 20 },
  ]),
  async (req, res) => {
    const combinedData = {
      ...req.body,
      product_video: req.files["product_video"] ? req.files["product_video"][0] : null,
      product_image: req.files["product_image"] ? req.files["product_image"] : [],
    };
    const { error } = ProductSchema.validate(combinedData);
    if (error) {
      return res
        .status(400)
        .json({ message: "🚫 Invalid request body!", error: error.details });
    }
    try {
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

      const product_video = req.files["product_video"]
        ? req.files["product_video"][0].filename
        : null;
      const product_images = req.files["product_image"]
        ? req.files["product_image"]
        : [];
      const is_featured_val = is_featured === "Yes" ? "Yes" : "No";

      // Insert product data into the database
      const query =
        "INSERT INTO products (category_id,brand_id,  product_name, product_code, product_color, family_color, group_code, product_price, product_weight, product_discount, discount_type, final_price, product_video, description, washcare, keywords, fabric, pattern, sleeve, fit, meta_keywords, meta_description, meta_title, occassion, is_featured) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const values = [
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
        is_featured_val,
      ];

      db.query(query, values, async (err, result) => {
        if (err) {
          console.error("🚫 " + err);
          return res
            .status(500)
            .json({ message: "🚫 Internal Server Error" });
        }

        const productId = result.insertId;

        if (product_images.length > 0) {
          const outputDirs = {
            large: "uploads/productImages/large",
            medium: "uploads/productImages/medium",
            small: "uploads/productImages/small",
          };

          const resolutions = {
            large: { width: 1280, height: 760 },
            medium: { width: 760, height: 480 },
            small: { width: 480, height: 320 },
          };

          // Ensure directories exist
          for (const dir of Object.values(outputDirs)) {
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }
          }

          // Process and save the images in different resolutions
          await Promise.all(
            product_images.map(async (file) => { //file: Represents the current file object, which includes properties like path (temporary location on the server) and filename.
              await Promise.all(
                Object.entries(resolutions).map( //Object.entries(resolutions).map(...): Iterates over each resolution defined in the resolutions object. This gives access to both the key (like large) and the resolution values (width, height).
                  async ([key, { width, height }]) => { //[key, { width, height }]: Destructures the current resolution object into key, width, and height.
                    const outputPath = path.join(
                      __dirname, //outputPath: The full path where the resized image will be saved. It combines the current directory (__dirname), the directory for the specific size (outputDirs[key]), and the original filename (file.filename).
                      outputDirs[key],
                      file.filename
                    );
                    await sharp(file.path)
                      .resize(width, height)
                      .toFile(outputPath);
                  }
                )
              );
            })
          );

          // Insert each product image into the database
          const imagesQuery =
            "INSERT INTO products_image (product_id, image, image_sort) VALUES ?";
          const imageValues = product_images.map((file, index) => [
            productId,
            file.filename,
            index + 1,
          ]);

          db.query(imagesQuery, [imageValues], (err, data) => {
            if (err) {
              console.error("🚫 " + err);
              return res
                .status(500)
                .json({ message: "🚫 Internal Server Error" });
            }
          });
        }

        // Handle product attributes
        let attributes = req.body.attributes;
        if (typeof attributes === "string") { //typeof attributes === "string": This checks if the attributes data is a string. This could happen if the attributes were sent as a JSON string.
          attributes = JSON.parse(attributes); //convert into objects or array
        }

        if (Array.isArray(attributes) && attributes.length > 0) {
          const attributesQuery =
            "INSERT INTO product_attributes (product_id, size, sku, price, stock) VALUES ?";
          const attributeValues = attributes.map((attribute) => [
            productId,
            attribute.size,
            attribute.sku,
            attribute.price,
            attribute.stock,
          ]);

          db.query(attributesQuery, [attributeValues], (err, data) => {
            if (err) {
              console.error("🚫 " + err);
              return res
                .status(500)
                .json({ message: "🚫 Internal Server Error" });
            }
          });
        }

        return res
          .status(200)
          .json({ message: "✅ Product added successfully!" });
      });
    } catch (error) {
      console.error("🚫 " + error);
      return res.status(500).json({ message: " 🚫 Internal Server Error" });
    }
  }
);


//========================================END====================================================

//===============================================UPDATE PRODUCT ============================
// const [existingProduct] = await db.query('SELECT id FROM products WHERE link = ? AND id != ?', [link, id]);
//       if (existingProduct) {
//         return res.status(400).json({ message: '🚫 Link already exists!' });
//       }
//update products
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

//========================================END====================================================

//===============================================delete status change============================
// category single data
app.get("/productedit/:id", (req, res) => {
  const id = req.params.id;
  const query = "select * from products where id=?";
  db.query(query, id, (err, result) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json({ message: "🚫 internal server error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "🚫 data not found!" });
    }
    const data = {
      ...result[0],
      category_image: `http://localhost:8081/uploads/categories/${result[0].category_image}`,
    };
    // console.log(data)
    return res.status(200).json({ message: "✅ data fetched!", data });
  });
});

//========================================END====================================================

//===============================================delete status change============================
// delete products
app.delete("/productdelete/:id", (req, res) => {
  const id = req.params.id;
  const query = "update products set deleted_at=current_timestamp where id=?";
  db.query(query, id, (err, result) => {
    if (err) {
      console.error("🚫 " + err);
    }
    return res.status(200).json({ message: "✅ Data deleted successfully!" });
  });
});

//========================================END====================================================

//===============================================delete status change============================
// toggle status
app.put("/handleproductstatus/:id", (req, res) => {
  const id = req.params.id;
  const status = req.body["statu"];
  // console.log(status)
  const newStatus = status === 1 ? 1 : 2;
  // console.log(newStatus)
  const query = "update products set status=? where id=?";
  db.query(query, [newStatus, id], (err, result) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json(err);
    }
    return res.status(200).json({ message: "✅ status updated successfully!" });
  });
});

//========================================END====================================================

//===============================================delete status change============================
// for searching product
app.get("/SearchProducts/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const query = "SELECT * FROM products WHERE product_name LIKE? ";
  db.query(query, [`%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error("🚫 Error searching for products", err);
      res.status(500).json({ error: "🚫 internal Server Error" });
      return;
    }
    res.json(results);
  });
});

//========================================END====================================================

//===============================================delete status change============================
// productcolor
app.get("/productcolor", (req, res) => {
  const query = "select * from colors";
  db.query(query, (err, data) => {
    if (err) {
      console.error("🚫 " + err);
    }
    res.json(data);
  });
});

//========================================END====================================================

//===============================================delete status change============================
app.get("/allproductcount", (req, res) => {
  const query =
    "SELECT COUNT(*) AS total FROM products WHERE deleted_at IS NULL";

  db.query(query, (err, data) => {
    if (err) {
      console.error("🚫 " + err);
      res.status(500).json({ error: "🚫 Internal server error" });
    } else {
      const productcount = data[0].total;
      res.json({ productcount: productcount });
    }
  });
});

//========================================END====================================================

//===============================================delete status change============================
// for products image
app.get("/getAllproductsImages", (req, res) => {
  const query = "select * from products_image where deleted_at is null";
  db.query(query, (err, data) => {
    if (err) {
      console.log("🚫 " + err);
    }
    return res.json(data);
  });
});

//========================================END====================================================

//===============================================delete status change============================
// handle productsimage status
app.put("/handleproductImagesstatus/:id", (req, res) => {
  // console.log(req.body)
  const id = req.params.id;
  const { status } = req.body;
  const query = "update products_image set status=? where id=?";
  db.query(query, [status, id], (err, data) => {
    if (err) {
      console.log("🚫 " + err);
    }
    return res.status(200).json({ message: "✅ status updated successfully!" });
  });
});

//========================================END====================================================

//===============================================delete status change============================
// delete products image
app.delete("/ProductsImageDelete/:id", (req, res) => {
  const id = req.params.id;
  const query =
    "update products_image set deleted_at=current_timestamp where id=?";
  db.query(query, id, (err, data) => {
    console.log("🚫 " + err);
  });
  return res.status(200).json({ message: "✅ Data deleted successfully!" });
});

//========================================END====================================================

//===============================================delete status change============================
app.get("/editproductattributes/:id", (req, res) => {
  const id = req.params.id;
  // console.log("idddddddddddddddddd",id)
  const query = "select * from product_attributes where product_id=?";
  db.query(query, id, (err, data) => {
    if (err) {
      console.log("🚫 " + err);
    }
    return res.status(200).json({ message: "✅ data fetched!", data });
  });
});

//========================================END====================================================

//===============================================delete status change============================
app.put("/ProductAttributesStatusChange/:id", (req, res) => {
  const productID = req.params.id;
  const { status } = req.body; // Extract status from the request body
  const newStatus = status === "Active" ? 1 : 0; // Convert status to integer

  // console.log(productID, newStatus);
  const query = "UPDATE product_attributes SET status = ? WHERE product_id = ?";

  db.query(query, [newStatus, productID], (err, data) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json({ message: "🚫 Internal Server Error" });
    }
    return res.status(200).json({ message: "✅ Status Updated Successfully" });
  });
});

//========================================END====================================================

//===============================================delete status change============================
// DELETE Endpoint
app.delete("/deleteattribute/:id", (req, res) => {
  const id = req.params.id;
  const query =
    "UPDATE product_attributes SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?";
  db.query(query, [id], (err, data) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json({ message: "🚫 Internal Server Error" });
    }
    return res.status(200).json({ message: "✅ Data deleted successfully!" });
  });
});

//========================================END====================================================

//===============================================delete status change============================
// GET Endpoint
app.get("/allproductsAttributes", (req, res) => {
  const query = "SELECT * FROM product_attributes WHERE deleted_at IS NULL";
  db.query(query, (err, data) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json({ message: " 🚫 Internal Server Error" });
    }
    return res.json(data);
  });
});

//========================================END====================================================

//===============================================delete status change============================
// getting brands table data
app.get("/getAllBrands", (req, res) => {
  const query = "select * from brands where deleted_at is null";
  db.query(query, (err, data) => {
    if (err) {
      console.log("🚫 " + err);
    }
    res.json(data);
  });
});

//========================================END====================================================

//===============================================delete status change============================
// get single brand details
app.get("/GetSingleBrandDetals/:id", (req, res) => {
  const id = req.params.id;
  const query = "select * from brands where id=?";
  db.query(query, id, (err, data) => {
    if (err) {
      console.log("🚫 " + err);
    }
    return res.status(200).json({ message: "✅ data fetched!", data });
  });
});

//========================================END====================================================

//===============================================delete status change============================
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

//========================================END====================================================

//===============================================delete status change============================
// add all brands
app.post(
  "/AddBrand",
  upload.fields([
    { name: "brand_image", maxCount: 1 },
    { name: "brand_logo", maxCount: 1 },
  ]),
  (req, res) => {
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

    const {
      brand_name,
      brand_discount,
      description,
      url,
      meta_title,
      meta_description,
      meta_keyword,
    } = req.body;
    const brand_image = req.files["brand_image"][0].filename;
    const brand_logo = req.files["brand_logo"][0].filename;

    const query =
      "INSERT INTO brands (brand_name, brand_image, brand_logo, brand_discount, description, url, meta_title, meta_descriptions, meta_keywords) VALUES (?,?,?,?,?,?,?,?,?)";

    db.query(
      query,
      [
        brand_name,
        brand_image,
        brand_logo,
        brand_discount,
        description,
        url,
        meta_title,
        meta_description,
        meta_keyword,
      ],
      (err, data) => {
        if (err) {
          console.log(" " + err);
          return res.status(500).json({ message: "🚫 Database error" });
        }
        return res.status(200).json({ message: "✅ Inserted successfully!" });
      }
    );
  }
);

//========================================END====================================================

//===============================================delete status change============================
// fetch all brands
app.get("/AllBrandCount", (req, res) => {
  const query = "select  count(distinct brand_name) as total  from brands";
  // const query="select  count(*) as total  from brands";
  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "🚫 Internal server error" });
    } else {
      const Brandcount = data[0].total; // Access using the alias 'total'
      // const count2 = data[0].email; // Access using the alias 'total'
      // console.log("Total Users:", count);
      res.json({
        Brandcount: Brandcount,
      });
    }
  });
});

//========================================END====================================================

//===============================================delete status change============================
// delete brand
app.delete("/branddelete/:id", (req, res) => {
  const id = req.params.id;

  const query = "SELECT brand_image, brand_logo FROM brands WHERE id = ?";
  db.query(query, [id], (err, data) => {
    if (err) {
      console.log("🚫 " + err);
      return res
        .status(500)
        .json({ message: "🚫 Error retrieving brand data" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Brand not found" });
    }

    const brandData = data[0];
    const brandImage = brandData.brand_image;
    const brandLogo = brandData.brand_logo;

    const deleteFile = (filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log("🚫 " + err);
          } else {
            // console.log(`File deleted: ${filePath}`);
          }
        });
      } else {
        console.log(`🚫 File does not exist: ${filePath}`);
      }
    };

    // Define the paths to the image and logo
    const brandImagePath = path.join(
      __dirname,
      `./uploads/Brands/BrandImage/${brandImage}`
    );
    const brandLogoPath = path.join(
      __dirname,
      `./uploads/Brands/BrandLogo/${brandLogo}`
    );

    // Delete image and logo files
    if (brandImage) {
      deleteFile(brandImagePath);
    }

    if (brandLogo) {
      deleteFile(brandLogoPath);
    }

    // Delete the brand from the database
    const deleteQuery = "DELETE FROM brands WHERE id = ?";
    db.query(deleteQuery, [id], (err) => {
      if (err) {
        console.log("🚫 " + err);
        return res.status(500).json({ message: "🚫 Error deleting brand" });
      }

      res.status(200).json({ message: "✅ Brand deleted successfully!" });
    });
  });
});

//========================================END====================================================

//===============================================delete status change============================
// brand status change
app.put("/handlebrandstatus/:id", (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  // const newStatus=status === 'Active' ? 1 : 0;
  const query = "UPDATE brands SET status=? WHERE id=?";

  db.query(query, [status, id], (err, data) => {
    if (err) {
      console.error("🚫 " + err);
      return res.status(500).json({ message: "🚫 Internal Server Error" });
    }
    return res.status(200).json({ message: "✅ Status Updated Successfully" });
  });
});

//========================================END====================================================

//===============================================delete status change============================
// for brand searching
app.get("/SearchBrands/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const query = "SELECT * FROM brands WHERE brand_name LIKE? ";
  db.query(query, [`%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error("🚫 Error searching for brands", err);
      res.status(500).json({ error: "🚫 internal Server Error" });
      return;
    }
    res.json(results);
  });
});

//========================================END====================================================

//===============================================get all banners============================

app.get("/getAllBanners", async (req, res) => {
  try {
    const banners = await getBanners();
    res.json(banners);
  } catch (err) {
    console.error("🚫 Error retrieving banners:", err);
    res.status(500).json({ message: "🚫 Internal Server Error" });
  }
});
const getBanners = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM banners WHERE deleted_at IS NULL";
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

//========================================END====================================================

//===============================================ading new banners============================
// banner inserting
app.post("/AddBanners", upload.single("BannerImage"), (req, res) => {
  const combinedData = { ...req.body, BannerImage: req.file };
  const { error } = BannerSchema.validate(combinedData);
  if (error) {
    return res
      .status(400)
      .json({ message: "🚫 Invalid request body!", error: error.details });
  }

  try {
    const { type, link, alt } = req.body;
    const BannerImage = req.file.filename;

    const query =
      "insert into banners (type, image, link, alt) values(?,?,?,?)";

    db.query(query, [type, BannerImage, link, alt], (err, data) => {
      if (err) {
        console.log("🚫 " + err);
        return res.status(500).json({ message: "🚫 Database error" });
      }
      return res.status(201).json({ message: "✅Inserted successfully!" });
    });
  } catch (error) {
    console.error("🚫 Error Adding Banner :", err);
    res.status(500).json({ message: "🚫 Error Adding Banner" });
  }
});

//========================================END====================================================

//===============================================delete status change============================
// single bannerdata retrival
app.get("/EditBannerDetails/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM banners WHERE id = ?";
  db.query(query, [id], (err, data) => {
    if (err) {
      console.log("🚫 Database query error:", err);
      res.status(500).json({ message: "🚫 Internal server error" });
      return;
    }
    if (data.length === 0) {
      res.status(404).json({ message: "No data found for the given ID" });
      return;
    }
    // console.log("Data fetched from DB:", data);
    res.status(200).json({ message: "✅ Data fetched successfully!", data });
  });
});

//========================================END====================================================

//===============================================update banner details============================

app.put("/UpdateBanners/:id", upload.single("BannerImage"), (req, res) => {
  const combinedData = { ...req.body, BannerImage: req.file };
  const { error } = BannerSchema.validate(combinedData);
  if (error) {
    return res
      .status(400)
      .json({ message: "🚫 Invalid request body!", error: error.details });
  }

  try {
    const id = req.params.id;
    const BannerImage = req.file ? req.file.filename : null;
    const { type, link, alt } = req.body;
    const query = "update banners set type=?,image=?,link=?,alt=?";
    db.query(query, [id, type, BannerImage, link, alt], (err, data) => {
      if (err) {
        console.log("🚫 " + err);
      }
      return res
        .status(200)
        .json({ message: "✅ Banner updated successfully!" });
    });
  } catch (error) {
    console.error("🚫 Error updating Banner Data:", err);
    res.status(500).json({ message: "🚫 Error updating Banner" });
  }
});
//========================================END====================================================

// ==============================================delete banners==============================================
app.delete("/DeleteBanners/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const bannerData = await getBannerData(id);
    if (!bannerData) {
      return res.status(404).json({ message: "Banner not found!" });
    }

    const imagePath = path.join(
      __dirname,
      `./uploads/banners/${bannerData.image}`
    );
    if (bannerData.image) {
      await deleteBannerImage(imagePath);
    }

    await deleteBannerFromDatabase(id);

    res.status(200).json({ message: "✅ Banner deleted successfully!" });
  } catch (error) {
    console.error("🚫 ", error);
    res.status(500).json({ message: "🚫 Internal Server Error" });
  }
});

const getBannerData = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT image FROM banners WHERE id=?";
    db.query(query, [id], (err, data) => {
      if (err) {
        console.error("🚫 Database error:", err);
        return reject(new Error("Database error"));
      }
      if (data.length === 0) {
        return resolve(null);
      }
      resolve(data[0]);
    });
  });
};

const deleteBannerImage = (imagePath) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("🚫 Error deleting file:", err);
          return reject(new Error("Error deleting file"));
        }
        resolve();
      });
    } else {
      console.warn(`File does not exist: ${imagePath}`);
      resolve();
    }
  });
};

const deleteBannerFromDatabase = (id) => {
  return new Promise((resolve, reject) => {
    const deleteQuery = "DELETE FROM banners WHERE id=?";
    db.query(deleteQuery, [id], (err) => {
      if (err) {
        console.error("🚫 Error deleting banner:", err);
        return reject(new Error("Error deleting banner"));
      }
      resolve();
    });
  });
};

//========================================END====================================================

//===============================================Banner status change============================

app.put("/handlebannerstatus/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    if (![0, 1].includes(status)) {
      throw new Error("Invalid Status Value!");
    }

    const query = "UPDATE banners SET status = ? WHERE id = ?";
    const result = await db.promise().query(query, [status, id]); // In summary, using a Promise in this example allows for asynchronous execution, simplified error handling, and more readable code. If you don't use a Promise, you would need to use a callback function, which can lead to callback hell, error handling complexity, and less readable code.
    res.status(200).json({ message: "✅ Status updated successfully" });
  } catch (error) {
    console.error("🚫 Error updating status:", err);
    res.status(500).json({ message: "🚫 Error updating status" });
  }
});

//========================================END====================================================

//===============================================Banner status change============================
app.post('/ContactUS', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: '⚠️ All fields are required' });
    }

    const query = "INSERT INTO ContactUS (name, email, subject, message) VALUES (?, ?, ?, ?)";
    db.query(query, [name, email, subject, message], (err, results) => {
      
      res.status(200).json({ message: '✅ Form submitted successfully' });
    });
  } catch (error) {
      console.error('🚫 Error inserting data:', error);
      return res.status(500).json({ message: '🚫 Internal Server Error' }); 
  }
});


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


//========================================END====================================================

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


app.listen(process.env.SERVERPORT, () => {
  console.log(`server listening at port ${process.env.SERVERPORT}`);
});

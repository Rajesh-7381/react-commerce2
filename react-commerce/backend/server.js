const express=require("express");
const cors=require("cors");
const mysql2=require("mysql2");
require('dotenv').config(); //note.txt
// for hashing password
const bcrypt=require("bcrypt");
// for file uploading
const multer=require("multer");
// for file date
const moment=require("moment"); //moment library working with date and times
const bodyParser = require('body-parser');//note.txt
const path=require("path");
const jwt=require("jsonwebtoken");//note.txt
// image process
const sharp=require("sharp"); //The sharp library is a popular JavaScript library for image processing in Node.js. It provides a simple and efficient API for resizing, cropping, and transforming images in a variety of formats, including JPEG, PNG, WebP, and TIFF.
const morgan=require("morgan");//note.txt
const transpoter=require("./Email/nodemailerConfig");
// const checkauth=require("./Auth/RouteCheckAuth");
// for file sysytem
const fs=require("fs");
const checkAuth = require("./Auth/RouteCheckAuth");
const app=express(); //create express.js(framework) instance

// middleware
app.use(cors()); //enables Cross-Origin Resource Sharing (CORS) to allow requests from different origins.
app.use(express.json()); // parses incoming requests with JSON payloads.
// Use Morgan middleware for logging HTTP requests
// app.use(morgan('combined')); //logs HTTP requests in a concise format.

// bodyParser.json() and bodyParser.urlencoded({ extended: true }): parse incoming request bodies in JSON and URL-encoded formats, respectively. 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files for profile images
app.use('/profile', express.static(path.join(__dirname, 'uploads/profile')));

// Serve static files for product video
app.use('/products',express.static(path.join(__dirname,'uploads/products')));

// Serve static files for category images
app.use('/categories',express.static(path.join(__dirname,'uploads/categories')));
// Serve static files for product images
// for image showing in frontend
app.use('/productsimage', express.static(path.join(__dirname, 'uploads/productImages/medium')));
// Middleware

//createPool is used to create a connection pool, which is a group of connections that are managed by the mysql2 library. createConnection is used to create a single connection to the database.
// createConnection is used to create a single connection to the database.
//The choice between createPool and createConnection depends on the specific needs of your application. 
// If you need to execute a large number of queries or need to improve the performance of your application, you should use createPool. If you only need to execute a few queries or need to perform a one-time operation, you can use createConnection.
const db=mysql2.createPool({
    host:process.env.LOCALHOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.PORT
});

// for category image inserting
// Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files in Node.js applications
const storage=multer.diskStorage({ //this specifies how  files should be stored on disk
  destination:(req,file,cb)=>{ //destination function within diskStorage determines the directory where the uploaded files will be stored based on the fieldname of the file
    if(file.fieldname==='image'){
      cb(null,"uploads/profile/");
    }else if(file.fieldname === 'category_image'){
      cb(null,"uploads/categories/");
    }else if(file.fieldname === 'product_video'){
      cb(null,"uploads/products/");
    }else if(file.fieldname === 'product_image'){
      cb(null,"uploads/productImages/")
    }else if(file.fieldname ==='brand_image'){
      cb(null,"uploads/Brands/BrandImage/")
    }else if(file.fieldname ==='brand_logo'){
      cb(null,'uploads/Brands/BrandLogo/');
    }
  },
  filename:(req,file,cb)=>{ //filename function determines the name of the file to be saved
    const ext=path.extname(file.originalname);//extracts orignal file extension
    cb(null,Date.now()+ext); //constructs the new filename by appending the current timestamp to the file extension, ensuring a unique filename
  },
});
const upload=multer({storage:storage}); //The upload constant is created using multer({storage: storage}), which initializes Multer with the defined storage configuration.

// register user data
app.post("/register",upload.single("image"), async (req, res) => {
  // console.log(req.body); // Log the incoming request body to check data
  const { name, mobile, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);

  db.query(
      "INSERT INTO AdminUser (name, mobile, email, password,image) VALUES (?, ?, ?, ?,?)",
      [name, mobile, email, hashedpassword,req.file.filename],
      (err, data) => {
          if (err) {
              console.error("Error submitting form", err);
              return res.status(500).json({ message: "Internal server error" });
          } else {
              res.json({ message: "User created successfully!" });
          }
      }
  );
  const mailOptions={
    from : process.env.EMAIL, // Your email address
    to : email, // reciver email
    subject: 'Welcome to Our Service!',
    text: `Hello ${name},\n\nThank you for registering at our service! We are excited to have you.\n\nBest regards,\nYour Company`,

  };
  transpoter.sendMail(mailOptions,(error,info)=>{
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Registration successful and email sent!' });
  })
});

// app.post("/register", upload.single("image"), async (req, res) => {
//     const { name, mobile, email, password } = req.body;
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         db.query(
//             "INSERT INTO AdminUser (name, mobile, email, password, image) VALUES (?, ?, ?, ?, ?)",
//             [name, mobile, email, hashedPassword, req.file.filename],
//             (err, data) => {
//                 if (err) {
//                     console.error("Error submitting form", err);
//                     return res.status(500).json({ message: "Internal server error" });
//                 } else {
//                     // Send welcome email
//                     const mailOptions = {
//                         from: process.env.EMAIL,
//                         to: email,
//                         subject: 'Welcome to Our Service!',
//                         text: `Hello ${name},\n\nThank you for registering at our service! We are excited to have you.\n\nBest regards,\nYour Company`,
//                     };

//                     transpoter.sendMail(mailOptions, (error, info) => {
//                         if (error) {
//                             console.error('Error sending email:', error);
//                             return res.status(500).json({ message: 'User created but failed to send email' });
//                         }
//                         console.log('Email sent:', info.response);
//                         res.status(200).json({ message: 'Registration successful and email sent!' });
//                     });
//                 }
//             }
//         );
//     } catch (error) {
//         console.error("Error during registration:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });


app.post("/login",(req, res,next) => {
  const { email, password, check } = req.body;
  console.log(req.body)
  if (!email || !password) {
    return res.status(400).json({ status: 0, message: "Email and password are required" });
  }

  const query = "SELECT * FROM AdminUser WHERE email = ?";
  db.query(query, [email], async (err, data) => {
    if (err) {
      console.error("Login unsuccessful:", err);
      return res.status(500).json({ status: 0, message: "Internal server error" });
    }

    if (data.length === 0) {
      return res.status(401).json({ status: 0, message: "Invalid email or password" });
    }

    const user = data[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ status: 0, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role, id: user.id },
      // 'dummy text',
      process.env.JWT_SECRET,
      // { expiresIn: check ? '7d' : process.env.JWT_EXPIRATION }
      { expiresIn: "24h" }
    );

    console.log('Generated Token:', token); // Log the generated token for debugging
    console.log('Secret Key:', process.env.JWT_SECRET); // Log the JWT secret key for debugging

    res.status(200).json({
      status: 1,
      message: "Login successful",
      email:user.email,
      role: user.role,
      id: user.id,
      token:token
    });
  });
});


// forgot password before check email already exist in database or not
app.get("/checkemail/:email", (req, res) => {
  const email = req.params.email;
  const query = "SELECT * FROM AdminUser WHERE email=?";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error checking email', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const exists = result.length > 0;
    return res.json({ exists });
  })
});

// afetr forgotting password    
const saltRounds = process.env.SALTROUNDS;
app.post("/passwordforgot/:email", async (req, res) => {
  const { email } = req.params;
  const { password } = req.body;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const query = "UPDATE AdminUser SET password=? WHERE email=?";
    db.query(query, [hashedPassword, email], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      return res.status(200).json({ message: "Updated successfully!" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// count user
app.get('/countuser', (req, res) => {
  const query = "SELECT COUNT(id) AS total FROM AdminUser where role='user'"; // Alias 'count(id)' as 'total'
  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({message: "Internal server error"});
    } else {
      const count = data[0].total; // Access using the alias 'total'
      // const count2 = data[0].email; // Access using the alias 'total'
      // console.log("Total Users:", count);
      res.json({
        count: count
        
      });
    }
  });
});
// count admin
app.get('/countadmin', (req, res) => {
  const query = "SELECT COUNT(id) AS total FROM AdminUser where role='admin'"; // Alias 'count(id)' as 'total'
  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({message: "Internal server error"});
    } else {
      const Admincount = data[0].total; // Access using the alias 'total'
      // const count2 = data[0].email; // Access using the alias 'total'
      // console.log("Total Users:", count);
      res.json({
        Admincount: Admincount
        
      });
    }
  });
});
// subadmin count
app.get('/countsubadmin', (req, res) => {
  const query = "SELECT COUNT(id) AS total FROM AdminUser where role='subadmin'"; // Alias 'count(id)' as 'total'
  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({message: "Internal server error"});
    } else {
      const subaAdmincount = data[0].total; // Access using the alias 'total'
      // const count2 = data[0].email; // Access using the alias 'total'
      // console.log("Total Users:", count);
      res.json({
        subaAdmincount: subaAdmincount
        
      });
    }
  });
});


// show all user data
app.get('/alldata', (req, res) => {
  const sql = "SELECT * FROM AdminUser where deleted_at is null";
  db.query(sql, (err, data) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal server error" });
      }
      return res.json(data);
  });
});


// show single data
app.get("/singledata/:id",(req,res)=>{
  const id=req.params.id;
  
  const query="select * from AdminUser where id=?";
  db.query(query,id,(err,result)=>{
    if(err){
      console.error("error fetching data",err);
      return res.status(500).json({message:"internal server error"});
    }
    if(result.length===0){
      return res.status(404).json({message:"data not found!"});
    }
    return res.status(200).json({message:"data fetched successfully!",data:result[0]});

    }
  )
});

// editdata
app.get("/editdata/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const query = "select * from AdminUser where id=?";
  db.query(query, [id], (err, result) => {
      if (err) {
          console.error("error fetching data", err);
          return res.status(500).json({ message: "internal server error" });
      }
      if (result.length === 0) {
          return res.status(404).json({ message: "data not found!" });
      }
      return res.status(200).json({ message: "data fetched successfully!", data: result[0] });
  });
});

// Add update user endpoint
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id)
  const { name, mobile, email, password, role } = req.body;
  const query = "UPDATE AdminUser SET name=?, mobile=?, email=?, password=?, role=? WHERE id=?";

  db.query(query, [name, mobile, email, password, role, id], (err, result) => {
    if (err) {
      console.error("Error updating data", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ message: "Data updated successfully!" });
  });
});

// delete functionality
app.delete("/deletesingledata/:id",(req,res)=>{
  const id=req.params.id;
  const query="UPDATE AdminUser SET deleted_at = CURRENT_TIMESTAMP WHERE id=?";
  db.query(query,id,(err,result)=>{
    if(err){
      console.error(err);
      return res.status(500).json({message:"internal server error"})
    }
    return res.status(200).json({message:"deleted sucessfully!"})
  })
});

// particular date through user data show 
app.get("/registerUserParticularDate/:date", (req, res) => {
  const date = req.params.date;
  // const formattedDate = date.split('-').reverse().join('-');
  // console.log(formattedDate)

  // here issue is created_at stored date time format but i want to show date format thats why we use  'CAST' or 'DATE_FORMAT'
  // const query="SELECT COUNT(*) AS count FROM AdminUser WHERE role='user' AND CAST(created_at AS DATE) = ?";
  const query="SELECT COUNT(*) AS count FROM AdminUser WHERE role='user' AND DATE(created_at) = ?";
  db.query(query, [date], (err, data) => {
  // db.query(query, [formattedDate], (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json(data[0]);
    }
  });
});
// from date to to date through user data show 
app.get("/registerUserfromrDateTotodate/:fromdate/:todate", (req, res) => {
  const fromdate = req.params.fromdate;
  const todate = req.params.todate;

  const query = "SELECT COUNT(*) AS count FROM AdminUser WHERE created_at BETWEEN ? AND ?";
  db.query(query, [fromdate, todate], (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json(data[0]);
    }
  });
});


// subadmins see all subadmins and user data
app.get("/subadmindata",(req,res)=>{
  const query ="select * from  AdminUser where role in('subadmin' ,'user')";
  db.query(query,(err,result)=>{
    if(err){
      console.error(err);
      return res.status(500).json({message:"internal server error"});
    }
    // return res.status(200).json({message:"data get successfully!"})
    return res.json(result);
  })
});

// cms page data
app.get("/cmspagedata",(req,res)=>{
  const query="select * from cmspages where deleted_at is null";
  db.query(query,(err,data)=>{
    if(err){
      console.error(err);

    }
    return res.json(data)
  })
});

// cms page staus change
app.put("/handlecmspagestatus/:id",(req,res)=>{
  const id=req.params.id;
  const {status}=req.body;
  const query="update cmspages set status=? where id =?";
  db.query(query,[status,id],(err,result)=>{
    if(err){
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({message:"status updated successfully!"});

  });
});

// cms page delete data
app.delete("/cmspagedelete/:id",(req,res)=>{
  const id=req.params.id;
  const query="update cmspages set deleted_at=CURRENT_TIMESTAMP where id=?";
  db.query(query,id,(err,result)=>{
    if(err){
      console.error(err)
      return res.status(500).json({message:"internal server error"});
    }
    return res.status(200).json({message:"deleted successfully!"});
  })
});

// update cmspage
app.put("/cmsupdatepage/:id", upload.none(), (req, res) => {
  const id = req.params.id;
  const { title, url, description, meta_title, meta_keywords, meta_description } = req.body;

  const query = "UPDATE cmspages SET title=?, url=?, description=?, meta_title=?, meta_keywords=?, meta_description=? WHERE id =?";
  db.query(query, [title, url, description, meta_title, meta_keywords, meta_description, id], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "Update successful" });
  })
});

// add cms pages
app.post("/cmsaddpage", upload.none(), (req, res) => {
  const { title, url, description, meta_title, meta_keywords, meta_description } = req.body;

  const query = "INSERT INTO cmspages (title, url, description, meta_title, meta_keywords, meta_description) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [title, url, description, meta_title, meta_keywords, meta_description], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "Insertion successful" });
  })
});

// cms edit data
app.get("/cmspageeditdata/:id",(req,res)=>{
  const id=req.params.id;
  const query="SELECT * FROM cmspages WHERE id=?";
  db.query(query,id,(err,result)=>{
    if(err){
      console.error(err);
      return res.status(500).json({message:"Internal server error"});
    }
    if(result.length===0){
      return res.status(404).json({ message: "Data not found!" });
    }
    return res.status(200).json({ data: result[0] });
  })
});

// FOR CATEGORIES
app.get("/categories", (req, res) => {
  const query = "SELECT * FROM categories WHERE deleted_at IS NULL";
  db.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.json(data);
  });
});


// add category
app.post("/addcategory",upload.single("category_image"), (req, res) => {
  const { category_name,parent_id, category_discount, description, url, meta_title, meta_description, meta_keyword } = req.body;
  const category_image=req.file.filename;
  const query = "INSERT INTO categories (category_name,parent_id,category_image, category_discount, description, url, meta_title, meta_description, meta_keyword) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(query, [category_name,parent_id,category_image, category_discount, description, url, meta_title, meta_description, meta_keyword], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.status(200).json({ message: "Data inserted successfully!" });
  });
});

// category single data
app.get("/categoryeditdata/:id",(req,res)=>{
  const id=req.params.id;
  const query="select * from categories where id=?";
  db.query(query,id,(err,result)=>{
    if(err){
      console.error(err);
      return res.status(500).json({message:"internal server error"});
    }
    if(result.length===0){
      return res.status(404).json({ message: "data not found!" });
    }
    const data={...result[0],category_image:`http://localhost:8081/uploads/categories/${result[0].category_image}`}
    // console.log(data)
    return res.status(200).json({message:"data fetched!",data});
  })
});


// update categories
app.put("/updatecategory/:id", upload.single("category_image"), (req, res) => {
  const id = req.params.id;
  const category_image = req.file.filename;
  const { category_name, parent_id, category_discount, description, url, meta_title, meta_description, meta_keyword } = req.body;
  const query = "UPDATE categories SET category_name=?, parent_id=?, category_image=?, category_discount=?, description=?, url=?, meta_title=?, meta_description=?, meta_keyword=? WHERE id=?";
  db.query(query, [category_name, parent_id, category_image, category_discount, description, url, meta_title, meta_description, meta_keyword, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ message: "Update successful!" });
  });
});

// delete category
app.delete("/categorydelete/:id", (req, res) => {
  const id = req.params.id;
  const query = "UPDATE categories SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?";
  db.query(query, id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ message: "Data deleted successfully!" });
  });
});

// update category status
app.put("/updatecategorystatus/:id", (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const query = "UPDATE categories SET status = ? WHERE id = ?";
  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ message: "Status updated successfully!" });
  });
});

// count distinct  categories
app.get("/uniquecategories", (req, res) => {
  const query = "SELECT COUNT(DISTINCT category_name) AS total FROM categories";
  db.query(query, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      const catcount = data[0].total;
      res.json({ catcount: catcount });
    }
  });
});

app.get("/categories2", (req, res) => {
  const query = "SELECT id FROM categories WHERE deleted_at IS NULL  ";
  // const query = "SELECT distinct parent_id FROM categories WHERE deleted_at IS NULL  ";
  db.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.json(data);
  });
});

app.get("/parentcategory/:parentId", (req, res) => {
  const parentId = req.params.parentId;
  const query = "SELECT category_name FROM categories WHERE id = ? AND deleted_at IS NULL";
  db.query(query, parentId, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Parent category not found" });
    }
    return res.json(data[0]);
  });
});


// all products data
app.get("/allproducts", (req, res) => {
  const query = `
    SELECT  p.*,  c.category_name AS category_name, pc.category_name AS parent_category_name
    FROM products p LEFT JOIN  categories c ON p.category_id = c.id LEFT JOIN 
      categories pc ON c.parent_id = pc.id WHERE p.deleted_at IS NULL `;
  db.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    // Map through the data to replace null category_name and parent_category_name with 'No Category' and 'No Parent Category' respectively
    const products = data.map((product) => ({
      ...product,
      category_name: product.category_name || "No Category",
      parent_category_name: product.parent_category_name || "No Parent Category",
    }));
    return res.json(products);
  });
});

app.post('/addproducts', upload.fields([{ name: 'product_video', maxCount: 1 }, { name: 'product_image', maxCount: 20 }]), async (req, res) => {
  try {
      const {
          category_id, product_name, product_code, product_color, family_color, group_code,
          product_price, product_weight, product_discount, discount_type, final_price, description,
          washcare, keywords, fabric, pattern, sleeve, fit, meta_keywords, meta_description,
          meta_title, occassion, is_featured
      } = req.body;

      const product_video = req.files['product_video'] ? req.files['product_video'][0].filename : null;
      const product_images = req.files['product_image'] ? req.files['product_image'] : [];
      const is_featured_val = is_featured === 'Yes' ? 'Yes' : 'No';

      // Insert product data into the database
      const query = "INSERT INTO products (category_id, product_name, product_code, product_color, family_color, group_code, product_price, product_weight, product_discount, discount_type, final_price, product_video, description, washcare, keywords, fabric, pattern, sleeve, fit, meta_keywords, meta_description, meta_title, occassion, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(query, [category_id, product_name, product_code, product_color, family_color, group_code, product_price, product_weight, product_discount, discount_type, final_price, product_video, description, washcare, keywords, fabric, pattern, sleeve, fit, meta_keywords, meta_description, meta_title, occassion, is_featured_val], async (err, result) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ message: "Internal Server Error" });
          }

          const productId = result.insertId;

          if (product_images.length > 0) {
              const outputDirs = {
                  large: 'uploads/productImages/large',
                  medium: 'uploads/productImages/medium',
                  small: 'uploads/productImages/small',
              };

              const resolutions = {
                  large: { width: 1280, height: 760 },
                  medium: { width: 760, height: 480 },
                  small: { width: 480, height: 320 }
              };

              // Ensure directories exist
              for (const dir of Object.values(outputDirs)) {
                  if (!fs.existsSync(dir)) {
                      fs.mkdirSync(dir, { recursive: true });
                  }
              }

              // Process and save the images in different resolutions
              await Promise.all(product_images.map(async (file) => {
                  await Promise.all(Object.entries(resolutions).map(async ([key, { width, height }]) => {
                      const outputPath = path.join(__dirname, outputDirs[key], file.filename);
                      await sharp(file.path)
                          .resize(width, height)
                          .toFile(outputPath);
                  }));
              }));

              // Insert each product image into the database
              const imagesQuery = "INSERT INTO products_image (product_id, image, image_sort) VALUES ?";
              const imageValues = product_images.map((file, index) => [productId, file.filename, index + 1]);

              db.query(imagesQuery, [imageValues], (err, data) => {
                  if (err) {
                      console.error(err);
                      return res.status(500).json({ message: "Internal Server Error" });
                  }
              });
          }

          // for product attributes
          let attributes = req.body.attributes;
          if (typeof attributes === 'string') {
              attributes = JSON.parse(attributes);
          }

          if (Array.isArray(attributes) && attributes.length > 0) {
              const attributesQuery = "INSERT INTO product_attributes (product_id, size, sku, price, stock) VALUES ?";
              const attributeValues = attributes.map((attribute) => [productId, attribute.size, attribute.sku, attribute.price, attribute.stock]);

              db.query(attributesQuery, [attributeValues], (err, data) => {
                  if (err) {
                      console.error(err);
                      return res.status(500).json({ message: "Internal Server Error" });
                  }
              });
          }

          return res.status(200).json({ message: "Product added successfully!" });
      });

  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
});


//update products
app.put("/updateproducts/:id",upload.single("product_video"), (req, res) => {
  const id = req.params.id;
  const product_video=req.file.filename;
  const {category_id,product_name,product_code,product_color,family_color,group_code,product_price,product_weight,product_discount,discount_type,final_price,description,washcare,keywords,fabric,pattern,sleeve,fit,meta_keywords,meta_description,meta_title,occassion,is_featured} = req.body;
  const query = "UPDATE products SET category_id=?, product_name=?, product_code=?,product_color=?, family_color=?, group_code=?, product_price=?, product_weight=?, product_discount=?, discount_type=?, final_price=?,product_video=?, description=?, washcare=?, keywords=?, fabric=?, pattern=?, sleeve=?, fit=?, meta_keywords=?, meta_description=?, meta_title=?, occassion=?, is_featured=? WHERE id=?";
  db.query(
    query,[category_id,product_name,product_code,product_color,family_color,group_code,product_price,product_weight,product_discount,discount_type,final_price,product_video,description,washcare,keywords,fabric,pattern,sleeve,fit,meta_keywords,meta_description,meta_title,occassion,is_featured,id],(err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.status(200).json({ message: "Updated successfully!" });
    }
  );
});

// category single data
app.get("/productedit/:id",(req,res)=>{
 const id=req.params.id;
  const query="select * from products where id=?";
  db.query(query,id,(err,result)=>{
    if(err){
      console.error(err);
      return res.status(500).json({message:"internal server error"});
    }
    if(result.length===0){
      return res.status(404).json({ message: "data not found!" });
    }
    const data={...result[0],category_image:`http://localhost:8081/uploads/categories/${result[0].category_image}`}
    // console.log(data)
    return res.status(200).json({message:"data fetched!",data});
  })
});


// delete products
app.delete("/productdelete/:id",(req,res)=>{
  const id=req.params.id;
  const query ="update products set deleted_at=current_timestamp where id=?";
  db.query(query,id,(err,result)=>{
    if(err){
      console.error(err);
    }
    return res.status(200).json({ message: "Data deleted successfully!" });
  })
});

// toggle status
app.put("/updatestatus/:id",(req,res)=>{
  const id=req.params.id;
  const { status } = req.body;
  const query="update products set status=? where id=?";
  db.query(query,[status,id],(err,result)=>{
    if(err){
      console.error(err);
    }
    return res.status(200).json({message:"status updated successfully!"});
  })
});

// productcolor
app.get("/productcolor" ,(req,res)=>{
  const query="select * from colors";
  db.query(query,(err,data)=>{
    if(err){
      console.error(err);
    }
    res.json(data);
  })
});

app.get("/allproductcount",(req, res) => {
  const query = "SELECT COUNT(*) AS total FROM products WHERE deleted_at IS NULL";

  db.query(query, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      const productcount = data[0].total;
      res.json({ productcount: productcount });
    }
  });
});


// for products image
app.get("/productsimage",(req,res)=>{
  const query="select * from products_image where deleted_at is null";
  db.query(query,(err,data)=>{
    if(err){
      console.log(err);
    }
    return res.json(data);
  })
});

// handle productsimage status
app.put("/handleproductsstatus/:id",(req,res)=>{
  // console.log(req.body)
  const id=req.params.id;
  const {status}=req.body;
  const query="update products_image set status=? where id=?";
  db.query(query,[status,id],(err,data)=>{
    if(err){
      console.log(err);
    }
    return res.status(200).json({message:"status updated successfully!"});
  })
});

// delete products image
app.delete("/productsimagedelete/:id",(req,res)=>{
  const id=req.params.id;
  const query="update products_image set deleted_at=current_timestamp where id=?";
  db.query(query,id,(err,data)=>{
    // console.log(err);
  });
  return res.status(200).json({ message: "Data deleted successfully!" });
});


app.get("/editproductattributes/:id",(req,res)=>{
  const id=req.params.id;
  // console.log("idddddddddddddddddd",id)
  const query="select * from product_attributes where product_id=?";
  db.query(query,id,(err,data)=>{
    if(err){
      console.log(err)
    }
    return res.status(200).json({message:"data fetched!",data});
  });
});

app.put("/ProductAttributesStatusChange/:id", (req, res) => {
  const productID = req.params.id;
  const { status } = req.body; // Extract status from the request body
  const newStatus = status === 'Active' ? 1 : 0; // Convert status to integer

  // console.log(productID, newStatus);
  const query = "UPDATE product_attributes SET status = ? WHERE product_id = ?";

  db.query(query, [newStatus, productID], (err, data) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.status(200).json({ message: "Status Updated Successfully" });
  });
});

// DELETE Endpoint
app.delete("/deleteattribute/:id", (req, res) => {
  const id = req.params.id;
  const query = "UPDATE product_attributes SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?";
  db.query(query, [id], (err, data) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.status(200).json({ message: "Data deleted successfully!" });
  });
});


// GET Endpoint
app.get("/allproductsAttributes", (req, res) => {
  const query = "SELECT * FROM product_attributes WHERE deleted_at IS NULL";
  db.query(query, (err, data) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.json(data);
  });
});

// getting brands table data
app.get("/getAllBrands",(req,res)=>{
  const query="select * from brands where deleted_at is null";
  db.query(query,(err,data)=>{
    if(err){
      console.log(err)
    }
    res.json(data);
  })
});

// get single brand details
app.get("/GetSingleBrandDetals/:id",(req,res)=>{
  const id=req.params.id;
  const query="select * from brands where id=?";
  db.query(query,id,(err,data)=>{
    if(err){
      console.log(err);
    }
    return res.status(200).json({message:"data fetched!",data});
  })
});

app.put("/UpdateBrand/:id",(req,res)=>{
  const id=req.params.id;
  const query="update brands set "
});

app.post("/AddBrand", upload.fields([{ name: 'brand_image', maxCount: 1 }, { name: 'brand_logo', maxCount: 1 }]), (req, res) => {
  const { brand_name, brand_discount, description, url, meta_title, meta_description, meta_keyword } = req.body;
  const brand_image = req.files['brand_image'] ? req.files['brand_image'][0].filename : null;
  const brand_logo = req.files['brand_logo'] ? req.files['brand_logo'][0].filename : null;

  const query = "INSERT INTO brands (brand_name, brand_image, brand_logo, brand_discount, description, url, meta_title, meta_descriptions, meta_keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
  db.query(query, [brand_name, brand_image, brand_logo, brand_discount, description, url, meta_title, meta_description, meta_keyword], (err, data) => {
      if (err) {
          console.log(err);
          return res.status(500).json({ message: "Database error" });
      }
      return res.status(200).json({ message: "Inserted successfully!" });
  });
});

app.get("/AllBrandCount",(req,res)=>{
  const query="select  count(distinct brand_name) as total  from brands";
  // const query="select  count(*) as total  from brands";
  db.query(query,(err,data)=>{
    if (err) {
      return res.status(500).json({message: "Internal server error"});
    } else {
      const Brandcount = data[0].total; // Access using the alias 'total'
      // const count2 = data[0].email; // Access using the alias 'total'
      // console.log("Total Users:", count);
      res.json({
        Brandcount: Brandcount
        
      });
    }
  })
})

app.listen(process.env.SERVERPORT,()=>{
    console.log(`server listening at port ${process.env.SERVERPORT}`);
});
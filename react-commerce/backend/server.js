const express=require("express");
const cors=require("cors");
const mysql2=require("mysql2");
// for hashing password
const bcrypt=require("bcrypt");
// for file uploading
const multer=require("multer");
// for file date
const moment=require("moment");
const path=require("path");
const jsonwebtoken=require("jsonwebtoken");
const app=express();
app.use(cors());
app.use(express.json());

const db=mysql2.createPool({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"ReactCommerce",
    port:"3307"
});

// for category image inserting
// Multer configuration for file upload
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    if(file.fieldname==='image'){
    cb(null,"uploads/profile/");
    }else if(file.fieldname === 'category_image'){
      cb(null,"uploads/categories/");
    }else if(file.fieldname === 'product_video'){
      cb(null,"uploads/products");
    }
  },
  filename:(req,file,cb)=>{
    const ext=path.extname(file.originalname);
    cb(null,Date.now()+ext);
  },
})
const upload=multer({storage:storage});

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
});

// login user data
app.post("/login", (req, res) => {
  const { email, password ,check} = req.body;

  const query = "SELECT * FROM AdminUser WHERE email = ?";
  db.query(query, [email], async (err, data) => {
    if (err) {
      console.error("Login unsuccessful:", err);
      return res.status(500).json({ message: "Internal server error" });
    } else if (data.length > 0) {
      const user = data[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token=jsonwebtoken.sign({email:user.email},'Amirpeet',{expiresIn : check ? '7d' : '1d'});
        res.json({
          status: 1, 
          message: "Login successful",
          role: user.role,
          id: user.id,
          token
        });
      } else {
        res.json({ status: 0, message: "Invalid email or password" });
      }
    } else {
      res.json({ status: 0, message: "Invalid email or password" });
    }
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
})

// afetr forgotting password    
const saltRounds = 10;
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
})

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
})

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
})

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
})

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
})

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
})

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
})


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
})

// insert products
app.post("/addproducts", upload.single("product_video"), (req, res) => {
  try {
    const {category_id, product_name, product_code,product_color, family_color, group_code, product_price, product_weight, product_discount, discount_type, final_price, description, washcare, keywords, fabric, pattern, sleeve, fit, meta_keywords, meta_description, meta_title, occassion, is_featured } = req.body;
    const product_video = req.file ? req.file.filename : null;
    const is_featured_val = is_featured === 'Yes' ? 'Yes' : 'No';
    
    const query = "INSERT INTO products (category_id,product_name, product_code,product_color, family_color, group_code, product_price, product_weight, product_discount, discount_type, final_price, product_video, description, washcare, keywords, fabric, pattern, sleeve, fit, meta_keywords, meta_description, meta_title, occassion, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
    
    db.query(query, [category_id,product_name, product_code,product_color, family_color, group_code, product_price, product_weight, product_discount, discount_type, final_price, product_video, description, washcare, keywords, fabric, pattern, sleeve, fit, meta_keywords, meta_description, meta_title, occassion, is_featured_val], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.status(200).json({ message: "Product added successfully!" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
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
app.get("/productcolor",(req,res)=>{
  const query="select * from colors";
  db.query(query,(err,data)=>{
    if(err){

    }
    res.json(data);
  })
})

app.listen(8081,()=>{
    console.log("server listening at port 8081");
})
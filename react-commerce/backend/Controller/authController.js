const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db=require("../config/dbconfig");

// register user data
exports.register= async (req, res) => {
    try {
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
        // const mailOptions={
        // from : process.env.EMAIL, // Your email address
        // to : email, // reciver email
        // subject: 'Welcome to Our Service!',
        // text: `Hello ${name},\n\nThank you for registering at our service! We are excited to have you.\n\nBest regards,\nYour Company`,
    
        // };
        // transpoter.sendMail(mailOptions,(error,info)=>{
        // if (error) {
        //     console.error('Error sending email:', error);
        //     return res.status(500).json({ message: 'Internal Server Error' });
        // }
        // console.log('Email sent:', info.response);
        // res.status(200).json({ message: 'Registration successful and email sent!' });
        // });

    } catch (error) {
        console.error("Error submitting form", error);
        return res.status(500).json({ message: "Internal server error" });
    }
  };
  
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
  
  exports.login=async(req, res,next) => {
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
  };
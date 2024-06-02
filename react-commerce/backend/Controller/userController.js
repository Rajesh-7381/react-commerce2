const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/email");

exports.register = async (req, res) => {
  const { name, mobile, email, password } = req.body;
  const image = req.file.filename;

  try {
    await User.register({ name, mobile, email, password, image });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Welcome to Our Service!",
      text: `Hello ${name},\n\nThank you for registering at our service! We are excited to have you.\n\nBest regards,\nYour Company`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Registration successful and email sent!" });
    });
  } catch (err) {
    console.error("Error submitting form", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password, check } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: 0, message: "Email and password are required" });
  }

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ status: 0, message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ status: 0, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: check ? "7d" : "24h" }
    );

    // console.log("Generated Token:", token);
    // console.log("Secret Key:", process.env.JWT_SECRET);

    res.status(200).json({
      status: 1,
      message: "Login successful",
      email: user.email,
      role: user.role,
      id: user.id,
      token: token,
    });
  } catch (err) {
    console.error("Login unsuccessful:", err);
    res.status(500).json({ status: 0, message: "Internal server error" });
  }
};

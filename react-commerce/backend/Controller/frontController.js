const front = require("../Models/Front");

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

  
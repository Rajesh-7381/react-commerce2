const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user:"rajeshkumar73812@gmail.com",
    pass:"",
  },
});

 async function Sendmail(to, subject, text) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"E-commerce Team 👻" <rajeshkumar73812@gmail.com>', // sender address
    to,
    subject,
    text,
  });

  // console.log("Message sent: %s", info.messageId);
}

module.exports =Sendmail 

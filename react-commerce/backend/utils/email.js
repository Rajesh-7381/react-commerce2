const transporter = require("../Email/nodemailerConfig");

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

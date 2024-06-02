const nodemailer=require("nodemailer");

const transpoter=nodemailer.createTransport({
    service : process.env.EMAIL_SERVICE, // e.g., 'gmail', 'yahoo', 'outlook', etc.
    auth : {
        user: process.env.SENDER_EMAIL, // Your email address
        pass: process.env.EMAIL_PASSKEY, // Your email password or app password
    },
})
module.exports=transpoter;
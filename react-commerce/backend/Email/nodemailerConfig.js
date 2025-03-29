const nodemailer=require("nodemailer");

const transpoter=nodemailer.createTransport({
    
    host: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    secure: false, // Use `true` for port 465, `false` for all other port
    auth : {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASSKEY, 
    },
})
module.exports=transpoter;
const nodemailer=require("nodemailer");

const transpoter=nodemailer.createTransport({
    service : 'gmail', // e.g., 'gmail', 'yahoo', 'outlook', etc.
    auth : {
        user: 'pabitrahyd500016@gmail.com', // Your email address
        pass: 'Pabitrahyd@500016Bad', // Your email password or app password
    },
})
module.exports=transpoter;
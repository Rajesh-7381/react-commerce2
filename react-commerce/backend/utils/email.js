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

require("dotenv").config();

const SibApiV3Sdk = require("sib-api-v3-sdk");  // Import Brevo (Sendinblue) API SDK
const apiKey = process.env.BREVO_API_KEY;       // Get Brevo API Key from environment variables

SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey = apiKey;    // Configure the Brevo API client with the API key

const sendEmail2 = async (toEmail, subject, htmlContent) => {

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();      // Initialize the Transactional Email API

    // Define the sender (must be verified in Brevo)
    const sender = {
        email: "rajeshkumar73812@gmail.com", // Replace with your verified Brevo sender email
        name: "PlatixTestEmail" // Change this to match your app's branding
    };

    // Define the recipient(s)
    const receivers = [{ email: toEmail }];

    try {
        // Send the email using Brevo's API
        await tranEmailApi.sendTransacEmail({
            sender,    // Sender details
            to: receivers, // Recipient list
            subject,   // Email subject
            htmlContent // Email body (supports HTML)
        });

        console.log(`✅ OTP email sent successfully to ${toEmail}`);
        return { success: true, message: "Email sent successfully!" };
    } catch (error) {
        console.error("❌ Failed to send email:", error.message);
        return { success: false, message: error.message };
    }
};

// Export the sendEmail function for use in other files
module.exports = { sendEmail2 };
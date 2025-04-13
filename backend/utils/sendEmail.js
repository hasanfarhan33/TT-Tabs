const nodemailer = require("nodemailer")

const sendEmail = async (to, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS,
            }
        }); 
    
        await transporter.sendMail({
            from: process.env.EMAIL_USER, 
            to, 
            subject, 
            text, 
            html,
        }); 
    
        console.log("Email sent successfully")

    } catch (error) {
        console.error("Email sending error:", error);
    }
}

module.exports = sendEmail; 
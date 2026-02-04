// emailService.js placeholder
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendSmartEmail = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: '"CRM System" <no-reply@crm.com>', 
      to: to, 
      subject: subject, 
      html: htmlContent, 
    });
    console.log("Email sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Email Error:", error);
    return false;
  }
};

module.exports = sendSmartEmail;
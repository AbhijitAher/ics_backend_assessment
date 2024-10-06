// mailer.js
const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use a relevant email service provider
  auth: {
    user: "", // your email
    pass: "", // your email password or app-specific password
  },
});

// Function to send email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "seabhi.aher@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };

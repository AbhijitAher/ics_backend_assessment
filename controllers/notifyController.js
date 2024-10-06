// emailRoutes.js
const express = require("express");
const { sendEmail } = require("../config/sendMail"); // Adjust the path based on your project structure

const router = express.Router();

// API to send mail notification for reading a book
const sendBookNotification = async (req, res) => {
  const { userEmail, bookTitle, author } = req.body;

  // Validate input
  if (!userEmail || !bookTitle || !author) {
    return res
      .status(400)
      .json({ message: "Please provide userEmail, bookTitle, and author." });
  }

  const subject = `Reminder: Time to Read ${bookTitle}!`;
  const text = `Dear Reader,\n\nThis is a friendly reminder to read "${bookTitle}" by ${author}. Enjoy your reading!\n\nBest Regards,\nYour Bookshelf App`;

  try {
    await sendEmail(userEmail, subject, text);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to send email. Please try again later." });
  }
};

module.exports = {
  sendBookNotification,
};

/**
 * @swagger
 * /send-book-notification:
 *   post:
 *     summary: Send email notification for reading a book
 *     description: Sends a reminder email to the user about a specific book to read.
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               bookTitle:
 *                 type: string
 *                 description: The title of the book to be read.
 *               author:
 *                 type: string
 *                 description: The author of the book.
 *             required:
 *               - userEmail
 *               - bookTitle
 *               - author
 *     responses:
 *       200:
 *         description: Email sent successfully!
 *       400:
 *         description: Bad request, missing required fields.
 *       500:
 *         description: Internal server error, failed to send email.
 */

const express = require("express");
const { sendBookNotification } = require("../controllers/notifyController");

const router = express.Router();

router.post("/send-book-notification", sendBookNotification);

module.exports = router;

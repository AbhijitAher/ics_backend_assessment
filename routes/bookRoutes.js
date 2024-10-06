const express = require("express");
const { createBook, getAllBooks, updateBook } = require("../controllers/bookController");

const router = express.Router();

router.post("/", createBook); // Create a book
router.get("/", getAllBooks); // Get all books
router.patch('/', updateBook); // Edit book

module.exports = router;

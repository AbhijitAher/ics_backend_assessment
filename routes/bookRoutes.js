const express = require("express");
const { createBook, getAllBooks } = require("../controllers/bookController");

const router = express.Router();

router.post("/", createBook); // Create a book
router.get("/", getAllBooks); // Get all books

module.exports = router;

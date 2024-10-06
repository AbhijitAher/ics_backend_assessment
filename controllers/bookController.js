const Book = require("../models/book");

// Create a book
const createBook = async (req, res) => {
  const { title, publication_date, author } = req.body;

  try {
    const newBook = new Book({ title, publication_date, author });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
};

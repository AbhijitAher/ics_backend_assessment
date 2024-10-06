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

const updateBook = async (req, res) => {
  try {
    let book_id = req.query.book_id;

    let updateData = req.body;
    // let { title, publication_date, author } = req.body;
    console.log({ updateData });

    // updateData.publication_date = updateData.publication_date ? new Date(updateData.publication_date) : undefined;
    // console.log({up})
    const updated_book = await Book.findByIdAndUpdate(
      book_id,
      { $set: updateData },
      // {
      //   title,
      //   publication_date: publication_date ? new Date(publication_date) : undefined,
      //   author,
      // },
      { new: true }
    );

    // console.log(updated_book.publication_date.toDateString());
    res.status(200).json(updated_book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  updateBook,
};

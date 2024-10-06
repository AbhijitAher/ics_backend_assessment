const { default: mongoose } = require("mongoose");
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
  const keyword = req.query.keyword;
  const author = req.query.author;

  let additionalFilters = {};
  if (author) {
    additionalFilters.author = author;
  }

  try {
    let books;
    if (keyword) {
      books = await Book.find({
        $and: [
          {
            $or: [
              { title: { $regex: keyword, $options: "i" } },
              { author: { $regex: keyword, $options: "i" } },
            ],
          },
          { isDeleted: { $ne: true } },
          { ...additionalFilters },
        ],
        // $text: { $search: keyword }, // this is for searching using text index
      });
    } else {
      books = await Book.find({
        isDeleted: { $ne: true },
        ...additionalFilters,
      });
    }

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBook = async (req, res) => {
  let book_id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(book_id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
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

    if (!updated_book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // console.log(updated_book.publication_date.toDateString());
    res.status(200).json(updated_book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  let book_id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(book_id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    let book = await Book.findById(book_id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = await Book.findByIdAndUpdate(
      book_id,
      {
        isDeleted: true,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Book marked as deleted successfully",
      book: deletedBook,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
};

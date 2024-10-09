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

/**
 * @swagger
 * /upload-book-cover/{bookId}:
 *   post:
 *     summary: Upload a book cover for an existing book
 *     description: This endpoint allows users to upload a book cover image and associate it with an existing book by its ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: The ID of the book to which the cover will be added.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               bookCover:
 *                 type: string
 *                 format: binary
 *                 description: The book cover image file to upload.
 *     responses:
 *       200:
 *         description: Book cover uploaded successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 coverPath:
 *                   type: string
 *       400:
 *         description: Bad request, no bookCover provided.
 *       404:
 *         description: Book not found with the specified ID.
 *       500:
 *         description: Internal server error, failed to upload the book cover.
 */

const uploadBookCover = async (req, res) => {
  try {
    const { bookId } = req.params;

    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ message: "Please provide a bookCover." });
    }

    const coverPath = req.file.path;

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { book_cover_url: coverPath },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found." });
    }

    res
      .status(200)
      .json({ message: "Book cover uploaded successfully!", coverPath });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to upload book cover. Please try again later.",
    });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
  uploadBookCover,
};

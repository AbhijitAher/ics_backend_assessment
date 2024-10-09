const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publication_date: {
      type: Date,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    book_cover_url: {
      type: String,
    }
  },
  { timestamps: true }
);

BookSchema.index({ title: "text", author: "text" });

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;

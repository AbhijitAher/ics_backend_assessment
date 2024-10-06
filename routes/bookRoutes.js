const express = require("express");
const {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

router.post("/", createBook);
router.get("/", getAllBooks);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;

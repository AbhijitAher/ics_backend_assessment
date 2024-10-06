const express = require("express");
const {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API to manage books
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               publication_date:
 *                 type: string
 *                 format: date-time
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 publication_date:
 *                   type: string
 *                   format: date-time
 *                 author:
 *                   type: string
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve all books or filter them by a keyword in the title or author
 *     tags: [Books]
 *     parameters:
 *       - name: keyword
 *         in: query
 *         required: false
 *         description: Optional keyword to search for in book titles or authors
 *         schema:
 *           type: string
 *       - name: author
 *         in: query
 *         required: false
 *         description: Optional filter to retrieve books by a specific author
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of all books or filtered results based on the provided keyword and author
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   publication_date:
 *                     type: string
 *                     format: date-time
 *                   author:
 *                     type: string
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: An error occurred while processing the request
 */

/**
 * @swagger
 * /books/{id}:
 *   patch:
 *     summary: Update an existing book
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               publication_date:
 *                 type: string
 *                 format: date-time
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 publication_date:
 *                   type: string
 *                   format: date-time
 *                 author:
 *                   type: string
 *       400:
 *         description: Invalid ID format or input data
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Mark a book as deleted
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book marked as deleted successfully
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Book not found
 */

router.post("/", createBook);
router.get("/", getAllBooks);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;

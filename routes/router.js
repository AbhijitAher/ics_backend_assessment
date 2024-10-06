// routes/index.js
const express = require("express");
const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookRoutes");
const notificationRoutes = require("./notifyRoutes")

const router = express.Router();

// Use the individual routes
router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/notify", notificationRoutes)

module.exports = router;

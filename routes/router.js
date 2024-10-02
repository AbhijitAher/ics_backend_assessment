// routes/index.js
const express = require("express");
const userRoutes = require("./userRoutes");

const router = express.Router();

// Use the individual routes
router.use("/users", userRoutes);

module.exports = router;

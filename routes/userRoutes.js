// routes/userRoutes.js
const express = require('express');
const { createUser, getAllUsers } = require('../controllers/userController.js');

const router = express.Router();

// Define routes
router.post('/', createUser); // Create a new user
router.get('/', getAllUsers); // Get all users

module.exports = router;

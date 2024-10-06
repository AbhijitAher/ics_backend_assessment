const express = require('express');
const { createUser, getAllUsers } = require('../controllers/userController.js');

const router = express.Router();

router.post('/', createUser); // Create a new user
router.get('/', getAllUsers); // Get all users

module.exports = router;

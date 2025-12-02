const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register user
router.post('/register/user', authController.registerUser);

// Register salon owner
router.post('/register/salon', authController.registerSalon);

// Login
router.post('/login', authController.login);

// Get current user (protected route)
router.get('/me', authController.verifyToken, authController.getCurrentUser);

module.exports = router;


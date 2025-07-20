// routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para registrar uma nova clínica
// Ex: POST /api/v1/auth/register
router.post('/register', authController.register);

// Rota para fazer login
// Ex: POST /api/v1/auth/login
router.post('/login', authController.login);

module.exports = router;

// routes/sign-in.js
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/', authController.getAuth); // Define the route to call the controller


module.exports = router; // Export the router
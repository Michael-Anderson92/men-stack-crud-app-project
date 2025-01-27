// routes/dashboard.js
const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const router = express.Router();

router.get('/', dashboardController.getDashboard); // Define the route to call the controller

router.get('home', (req, res) => {
  res.render('dashboard/home.ejs')
})

module.exports = router; // Export the router

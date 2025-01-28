const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController'); // Import the healthController
const Medication = require('../models/medication')

// Define the POST route

router.get('/users/:userid/mymeds', async (req, res) => {
  const medications = await Medication.find({userId: req.session.user._id});
  res.render('dashboard/my-meds.ejs', {medications: medications});
});

router.get('/users/:userid/mymeds/newmed', (req, res) => {
  res.render('dashboard/new-med.ejs');
});

router.post('/users/:userid/mymeds', async (req, res) => {
  try {
    req.body.userId = req.session.user._id;
    const newMedication = new Medication(req.body);

    await newMedication.save();

    
  } catch (error) {
    console.log(error)
  }


  res.redirect(`/users/${req.params.userid}/dashboard`)
  
})

module.exports = router;

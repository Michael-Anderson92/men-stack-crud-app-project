const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController'); // Import the healthController
const Medication = require('../models/medication')
const User = require('../models/user')

// Define the POST route

router.get('/users/:userid/mymeds', async (req, res) => {
  const medications = await Medication.find({ userId: req.session.user._id });
  res.render('dashboard/my-meds.ejs', {
    medications: medications,
    activePage: 'mymeds', // Adding the activePage variable
    user: req.session.user // Passing the user object
  });
});


router.get('/users/:userid/mymeds/:medid/editmed', async (req, res) => {
  try {
    const user = await User.findById(req.params.userid); // Verify User model import is correct
    const medication = await Medication.findById(req.params.medid);
    if (!user || !medication) {
      return res.status(404).send('User or Medication not found');
    }
    res.render('dashboard/edit-med', { user, medication }); // Pass user and medication objects to the view
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/users/:userid/mymeds/:medid', async (req, res) => {
  try {
    const medication = await Medication.findOneAndUpdate(
      { _id: req.params.medid, userId: req.params.userid },
      req.body,
      { new: true }
    );
    if (!medication) {
      return res.status(404).send('Medication not found');
    }
    res.redirect(`/users/${req.params.userid}/mymeds`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/users/:userid/mymeds/:medid', async (req, res) => {
  try {
    await Medication.findByIdAndDelete(req.params.medid);
    res.redirect(`/users/${req.params.userid}/mymeds`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/users/:userid/mymeds/newmed', async (req, res) => {
  try {
    const user = await User.findById(req.params.userid); // Ensure User model import is correct
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('dashboard/new-med', { user }); // Pass the user object to the view
  } catch (err) {
    res.status(500).send(err.message);
  }
});



router.get('/users/:userid/mymeds/:medid/editmed', async (req, res) => {
  try {
    const medication = await Medication.findOne({ userId: req.params.userid });
    if (!medication) {
      return res.status(404).send('Medication not found');
    }
    res.render('dashboard/edit-med', { medication });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.post('/users/:userid/mymeds', async (req, res) => {
  try {
    req.body.userId = req.session.user._id;
    const newMedication = new Medication(req.body);

    await newMedication.save();

    
  } catch (error) {
    console.log(error)
  }


  res.redirect(`/users/${req.params.userid}/mymeds`)
  
})

module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user'); 

router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs');
});

router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});

router.post('/sign-up', async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send('Username already taken.');
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.send('Password and Confirm Password must match.');
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const userCreated = await User.create({
      username: req.body.username,
      password: hashedPassword,
      fullName: req.body.fullName,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      lastLogin: new Date()
    });

    req.session.user = {
      username: userCreated.username,
      _id: userCreated._id
    };

    res.redirect('/auth/sign-in');
  } catch (error) {
    console.log('Error while creating user:', error);
    res.redirect('/auth/sign-up');
  }
});

router.post('/sign-in', async (req, res) => {
  try {
    // First, get the user from the database
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send('Login failed. Please try again.');
    }
  
    // There is a user! Time to test their password with bcrypt
    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    );
    if (!validPassword) {
      return res.send('Login failed. Please try again.');
    }
  
    // There is a user AND they had the correct password. Time to make a session!
    // Avoid storing the password, even in hashed format, in the session
    // If there is other data you want to save to `req.session.user`, do so here!
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id
    };
  
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.redirect('/');
    console.log('Error while creating user:', error);
    res.redirect('/auth/sign-up');
  }
});

module.exports = router;

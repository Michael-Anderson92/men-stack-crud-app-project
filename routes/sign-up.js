const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

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
      password: hashedPassword
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

module.exports = router;

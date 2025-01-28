const express = require('express');
const router = express.Router();

router.get('/users/:userid/myweight', (req, res) => {
  res.render('dashboard/my-weight.ejs');
});

router.get('/users/:userid/myfitness', (req, res) => {
  res.render('dashboard/my-fitness.ejs');
});

router.get('/users/:userid/mysleep', (req, res) => {
  res.render('dashboard/my-sleep.ejs');
});

router.get('/users/:userid/mymind', (req, res) => {
  res.render('dashboard/my-mind.ejs');
});

module.exports = router;

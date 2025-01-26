const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");

//import controllers (endpoints)
const dashboardController = require('./controllers/dashboardController.js')
const authController = require('./controllers/authController.js');
const healthController = require('./controllers/healthController.js');
const indexController = require('./controllers/indexController.js');
const userController = require('./controllers/userController.js');

// import middleware functions
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const { application } = require('express');

const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
})

//Middleware
// parses form submissions to create req.body
app.use(express.urlencoded({ extended: false }));
// we can process delete and put requests
app.use(methodOverride("_method"))
// log out http requests into the server
app.use(morgan("dev"));
// creates/processes our session cookies
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Using the custom middleware function
// This must exist before our endpoints (because it is attaching) the user
// variable to the response (ejs page
app.use(passUserToView);

// ================================================
// ENDPOINTS
// Landing Page
app.get('/', (req, res) => {
  console.log(req.session, " <- req.sessionn")
// if we are logged in lets redirect the user to thir applications index page
// NOTE: THIS MAY CHANGE IN MY CASE IF I WANT A WELCOME PAGE PRIOR TO THE INDEX PAGE
 if (req.session.user) {
  res.redirect(`/users/${req.session.user._id}/dashboard`)
 } else {
  res.render('index.ejs');
 }
});

app.use(isSignedIn);
app.use("/users/:userId/dashboard", dashboardController)

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
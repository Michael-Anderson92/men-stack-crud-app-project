const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const path = require('path');  // Make sure this line is present


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // Set 'ejs' or any other view engine you are using

// Import middleware functions
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
})

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))
app.use(morgan("dev"));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

app.use(passUserToView);

// Landing Page
app.get('/', (req, res) => {
  console.log(req.session, " HELLO <- req.session");

  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/dashboard`);
  } else {
    res.render('index.ejs');
    console.log('could not render dashboard/home.ejs')
  }
});

// Define the welcome route
app.get('/welcome', (req, res) => {
  if (req.session.user) {
    res.render('welcome.ejs');
  } else {
    res.redirect('/');
  }
});

const dashboardRoutes = require('./routes/dashboard');
// Corrected imports in server.js
const authRoutes = require('./controllers/authController'); // Ensure this file exists


app.use('/auth', authRoutes);
app.use('/users/:userId/dashboard', isSignedIn, dashboardRoutes);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

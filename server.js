const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();  // Make sure this line is near the top and before any use of `app`
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const path = require('path');

// app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Import middleware functions
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const port = process.env.PORT || 3000;

// Database setup
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB ${mongoose.connection.name}.`))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

app.use(passUserToView);

// Routes
app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/dashboard`);
  } else {
    res.render('index.ejs');
  }
});

app.get('/welcome', (req, res) => {
  if (req.session.user) {
    res.render('welcome.ejs');
  } else {
    res.redirect('/');
  }
});

app.post('/auth/sign-out', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Error ending session: ", err);
      return res.status(500).send("Error ending session");
    }
    res.redirect('/'); // Redirect to login page
  });
});

const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./controllers/authController');
const healthRoutes = require('./routes/health');
const medicationRouter = require('./routes/medications');

app.use('/', medicationRouter);
app.use('/auth', authRoutes);
app.use('/users/:userId/dashboard', isSignedIn, dashboardRoutes);
app.use(healthRoutes);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

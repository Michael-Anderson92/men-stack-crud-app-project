const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  profilePicture: { type: String },
  joinDate: { type: Date, default: Date.now },
  lastLogin: { type: Date, required: true }
})





// Model Definitions
const User = mongoose.model('User', userSchema);



// Export Models
module.exports = User;

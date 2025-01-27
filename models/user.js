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

// Weight Schema
const weightSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  note: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Medication Schema
const medicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  medicationName: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  note: {
    type: String,
  },
});

// Model Definitions
const User = mongoose.model('User', userSchema);
const Weight = mongoose.model("Weight", weightSchema);
const Medication = mongoose.model("Medication", medicationSchema);

// Export Models
module.exports = {
  User,
  Weight,
  Medication
};

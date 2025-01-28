const mongoose = require("mongoose");

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

const Weight = mongoose.model("Weight", weightSchema);

module.exports = Weight;
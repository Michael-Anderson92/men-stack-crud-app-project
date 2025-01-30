const { Medication } = require('../models/user'); // Import Medication model

exports.createMedication = async (req, res) => {
  try {
    const { medicationName, dosage, frequency, startDate, endDate, note } = req.body;

    const newMedication = new Medication({
      medicationName,
      dosage,
      frequency,
      startDate,
      endDate,
      note,
      userId: req.session.user_id,
    });

    const savedMedication = await newMedication.save();

    res.status(201).json({
      message: 'Medication created successfully',
      data: savedMedication,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating medication',
      error: error.message,
    });
  }
};
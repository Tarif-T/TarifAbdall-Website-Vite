const mongoose = require("mongoose");

// Defines service offerings displayed in the portfolio.
const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);

const mongoose = require("mongoose");

// Defines portfolio project entries shown on the public site.
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    completion: { type: Date, required: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);

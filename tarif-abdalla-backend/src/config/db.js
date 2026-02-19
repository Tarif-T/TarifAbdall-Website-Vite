const mongoose = require("mongoose");

const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URI_FALLBACK;

  if (!uri) {
    throw new Error("MongoDB connection string is missing. Set MONGODB_URI or MONGODB_URI_FALLBACK.");
  }

  await mongoose.connect(uri);
  console.log("MongoDB connected successfully");
};

module.exports = connectDatabase;

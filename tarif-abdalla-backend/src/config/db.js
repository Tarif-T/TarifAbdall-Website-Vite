const mongoose = require("mongoose");

function isSrvLookupFailure(error) {
  const details = [error?.message, error?.cause?.message, error?.reason?.message]
    .filter(Boolean)
    .join(" ");

  return /querySrv\s+(ECONNREFUSED|ENOTFOUND|ETIMEOUT)/i.test(details);
}

// Connects Mongoose using the configured primary or fallback URI.
const connectDatabase = async () => {
  const primaryUri = process.env.MONGODB_URI;
  const fallbackUri = process.env.MONGODB_URI_FALLBACK;
  const uri = primaryUri || fallbackUri;

  if (!uri) {
    throw new Error("MongoDB connection string is missing. Set MONGODB_URI or MONGODB_URI_FALLBACK.");
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    const canFallbackToLocal =
      process.env.NODE_ENV !== "production" &&
      Boolean(primaryUri) &&
      Boolean(fallbackUri) &&
      isSrvLookupFailure(error);

    if (!canFallbackToLocal) {
      throw error;
    }

    console.warn(
      "Primary MongoDB SRV lookup failed. Falling back to MONGODB_URI_FALLBACK for local development."
    );

    await mongoose.disconnect();
    await mongoose.connect(fallbackUri);
    console.log("MongoDB connected successfully using fallback URI");
  }
};

module.exports = connectDatabase;

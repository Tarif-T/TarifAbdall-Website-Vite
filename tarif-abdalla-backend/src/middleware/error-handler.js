const createError = require("http-errors");

// Sends normalized API error payloads with optional stack traces in development.
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  const payload = {
    success: false,
    message: err.message || "Internal server error",
  };

  if (process.env.NODE_ENV !== "production") {
    payload.stack = err.stack;
  }

  res.status(status).json(payload);
};

module.exports = errorHandler;

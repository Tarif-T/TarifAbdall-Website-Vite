const createError = require("http-errors");

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

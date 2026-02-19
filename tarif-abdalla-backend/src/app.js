const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");

const apiRoutes = require("./routes");
const errorHandler = require("./middleware/error-handler");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

app.use(errorHandler);

module.exports = app;

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

// Health-style root route for quick API availability checks.
app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to Tarif Abdalla's Portfolio Website Backend API" });
});

// Base API route that documents available resource endpoints.
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "API base route",
    routes: [
      "/api/users",
      "/api/users/signup",
      "/api/users/signin",
      "/api/projects",
      "/api/services",
      "/api/references",
      "/api/contacts",
    ],
  });
});

app.use("/api", apiRoutes);

// Converts unknown routes into a standard 404 error.
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

app.use(errorHandler);

module.exports = app;

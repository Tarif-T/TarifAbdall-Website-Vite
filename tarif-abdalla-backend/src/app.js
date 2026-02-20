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

app.get("/", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "API base route",
    routes: ["/api/users", "/api/projects", "/api/services", "/api/references"],
  });
});

app.use("/api", apiRoutes);

app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

app.use(errorHandler);

module.exports = app;

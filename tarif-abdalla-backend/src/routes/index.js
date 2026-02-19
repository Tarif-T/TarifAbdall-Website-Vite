const referenceRoutes = require("./reference.routes");
const projectRoutes = require("./project.routes");
const serviceRoutes = require("./service.routes");
const userRoutes = require("./user.routes");

const router = require("express").Router();

router.use("/references", referenceRoutes);
router.use("/projects", projectRoutes);
router.use("/services", serviceRoutes);
router.use("/users", userRoutes);

module.exports = router;

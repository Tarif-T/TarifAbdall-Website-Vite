const referenceRoutes = require("./reference.routes");
const contactRoutes = require("./contact.routes");
const projectRoutes = require("./project.routes");
const serviceRoutes = require("./service.routes");
const userRoutes = require("./user.routes");

// Composes all API resource routers under the /api prefix.
const router = require("express").Router();

router.use("/references", referenceRoutes);
router.use("/contacts", contactRoutes);
router.use("/projects", projectRoutes);
router.use("/services", serviceRoutes);
router.use("/users", userRoutes);

module.exports = router;

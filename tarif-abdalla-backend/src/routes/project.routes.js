const router = require("express").Router();
const controller = require("../controllers/project.controller");
const authenticate = require("../middleware/authenticate");

router.get("/", controller.getProjects);
router.get("/:id", controller.getProjectById);
router.post("/", authenticate, controller.createProject);
router.put("/:id", authenticate, controller.updateProjectById);
router.delete("/:id", authenticate, controller.deleteProjectById);

module.exports = router;

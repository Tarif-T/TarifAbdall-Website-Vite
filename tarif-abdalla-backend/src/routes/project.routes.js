const router = require("express").Router();
const controller = require("../controllers/project.controller");

router.get("/", controller.getProjects);
router.get("/:id", controller.getProjectById);
router.post("/", controller.createProject);
router.put("/:id", controller.updateProjectById);
router.delete("/:id", controller.deleteProjectById);

module.exports = router;

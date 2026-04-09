const router = require("express").Router();
const controller = require("../controllers/reference.controller");
const authenticate = require("../middleware/authenticate");

// Contact routes currently reuse the reference controller handlers.
router.get("/", controller.getReferences);
router.get("/:id", controller.getReferenceById);
router.post("/", authenticate, controller.createReference);
router.put("/:id", authenticate, controller.updateReferenceById);
router.delete("/:id", authenticate, controller.deleteReferenceById);

module.exports = router;

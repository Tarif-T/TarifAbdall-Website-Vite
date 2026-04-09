const router = require("express").Router();
const controller = require("../controllers/reference.controller");
const authenticate = require("../middleware/authenticate");

// Reference routes for public reads and authenticated writes.
router.get("/", controller.getReferences);
router.get("/:id", controller.getReferenceById);
router.post("/", authenticate, controller.createReference);
router.put("/:id", authenticate, controller.updateReferenceById);
router.delete("/:id", authenticate, controller.deleteReferenceById);

module.exports = router;

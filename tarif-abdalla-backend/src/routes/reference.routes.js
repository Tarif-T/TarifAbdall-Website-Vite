const router = require("express").Router();
const controller = require("../controllers/reference.controller");

router.get("/", controller.getReferences);
router.get("/:id", controller.getReferenceById);
router.post("/", controller.createReference);
router.put("/:id", controller.updateReferenceById);
router.delete("/:id", controller.deleteReferenceById);

module.exports = router;

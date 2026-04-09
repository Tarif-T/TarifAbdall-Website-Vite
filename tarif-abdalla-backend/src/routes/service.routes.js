const router = require("express").Router();
const controller = require("../controllers/service.controller");
const authenticate = require("../middleware/authenticate");

router.get("/", controller.getServices);
router.get("/:id", controller.getServiceById);
router.post("/", authenticate, controller.createService);
router.put("/:id", authenticate, controller.updateServiceById);
router.delete("/:id", authenticate, controller.deleteServiceById);

module.exports = router;

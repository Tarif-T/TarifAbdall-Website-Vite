const router = require("express").Router();
const controller = require("../controllers/service.controller");

router.get("/", controller.getServices);
router.get("/:id", controller.getServiceById);
router.post("/", controller.createService);
router.put("/:id", controller.updateServiceById);
router.delete("/:id", controller.deleteServiceById);

module.exports = router;

const router = require("express").Router();
const controller = require("../controllers/user.controller");

router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.post("/", controller.createUser);
router.put("/:id", controller.updateUserById);
router.delete("/:id", controller.deleteUserById);

module.exports = router;

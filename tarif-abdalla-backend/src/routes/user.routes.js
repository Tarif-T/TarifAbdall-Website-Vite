const router = require("express").Router();
const controller = require("../controllers/user.controller");
const authenticate = require("../middleware/authenticate");

// User routes for account CRUD and authentication actions.
router.get("/", controller.getUsers);
router.post("/signin", controller.signInUser);
router.post("/signup", controller.createUser);
router.get("/:id", controller.getUserById);
router.post("/", controller.createUser);
router.put("/:id", authenticate, controller.updateUserById);
router.delete("/:id", authenticate, controller.deleteUserById);

module.exports = router;

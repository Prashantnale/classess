const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.post("/admin/register", UserController.Register);
router.post("/admin/login", UserController.Login);

module.exports = router;

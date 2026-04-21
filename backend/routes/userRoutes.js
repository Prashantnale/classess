const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.post("/admin/register", UserController.Register);

module.exports = router;

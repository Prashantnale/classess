const router = require("express").Router();
const ProductController = require("../controllers/ProductController");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

router.get("/products", auth, ProductController.getAll);
router.get("/products/:id", auth, ProductController.getOne);
router.post("/products", auth, upload.single("image"), ProductController.create);
router.put("/products/:id", auth, upload.single("image"), ProductController.update);
router.delete("/products/:id", auth, ProductController.remove);

module.exports = router;

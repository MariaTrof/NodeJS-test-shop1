const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

router.post("/", ProductController.create);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getOne);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.remove);

module.exports = router;

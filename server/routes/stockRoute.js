const express = require("express");
const router = express.Router();
const StockController = require("../controllers/stockController");

router.post("/", StockController.create);
router.patch("/:id/increase", StockController.increase);
router.patch("/:id/decrease", StockController.decrease);
router.get("/", StockController.getAll);

module.exports = router;

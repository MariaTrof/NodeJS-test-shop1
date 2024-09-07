const express = require("express");
const router = express.Router();
const ActionHistoryController = require("../controllers/actionController");

router.get("/", ActionHistoryController.getAll);
router.post("/", ActionHistoryController.addAction);

module.exports = router;

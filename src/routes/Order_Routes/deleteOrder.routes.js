const express = require("express");
const router = express.Router();
const deleteOrder = require("../../controllers/Order/deleteOrder");

router.delete("/order", deleteOrder);

module.exports = router;

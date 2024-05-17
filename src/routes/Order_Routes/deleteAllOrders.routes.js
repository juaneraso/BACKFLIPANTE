const express = require("express");
const router = express.Router();
const deleteAllOrders = require("../../controllers/Order/deleteAllOrders");

router.delete("/order/:userId", deleteAllOrders);

module.exports = router;

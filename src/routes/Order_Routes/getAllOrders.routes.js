const express = require("express");
const router = express.Router();
const getAllOrders = require("../../controllers/Order/getAllOrders");

router.get("/order", getAllOrders);

module.exports = router;

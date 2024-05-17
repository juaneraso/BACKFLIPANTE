const express = require("express");
const router = express.Router();
const paymentOrder = require("../../controllers/Order/paymentOrder");

router.put("/payment", paymentOrder);

module.exports = router;

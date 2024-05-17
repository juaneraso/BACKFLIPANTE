const express = require("express");
const router = express.Router();
const getOrderById = require("../../controllers/Order/getOrderById");

router.get("/orders/:id", getOrderById);

module.exports = router;

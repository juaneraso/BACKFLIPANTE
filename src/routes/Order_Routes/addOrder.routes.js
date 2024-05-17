const express = require("express");
const router = express.Router();
const addOrder = require("../../controllers/Order/addOrder");

router.post("/order", addOrder);

module.exports = router;

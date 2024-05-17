const express = require("express");
const router = express.Router();
const getCart = require("../../controllers/Cart/getCart");

router.get("/cart/:userId", getCart);

module.exports = router;

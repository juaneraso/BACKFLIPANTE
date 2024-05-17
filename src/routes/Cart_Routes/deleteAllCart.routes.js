const express = require("express");
const router = express.Router();
const deleteAllCart = require("../../controllers/Cart/deleteAllCart");

router.delete("/cart/:userId", deleteAllCart);

module.exports = router;

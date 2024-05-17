const express = require("express");
const router = express.Router();
const deleteAllProducts = require("../../controllers/Cart/deleteAllProduct");

router.delete("/all/:userId/:productId/:sizeId", deleteAllProducts);

module.exports = router;

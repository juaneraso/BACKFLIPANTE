const express = require("express");
const router = express.Router();
const deleteProduct = require("../../controllers/Cart/deleteProduct");

router.delete("/:userId/:productId/:sizeId", deleteProduct);

module.exports = router;

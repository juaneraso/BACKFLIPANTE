const express = require("express");
const postStockProduct = require("../../controllers/Products/postStockProduct");
const router = express.Router();

router.post("/products/:ProductId/:SizeId/:change", postStockProduct);

module.exports = router;

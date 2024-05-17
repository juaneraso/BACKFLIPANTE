const express = require("express");
const updateProduct = require("../../controllers/Products/updateProduct");
const router = express.Router();

router.put("/products/:id", updateProduct);

module.exports = router;

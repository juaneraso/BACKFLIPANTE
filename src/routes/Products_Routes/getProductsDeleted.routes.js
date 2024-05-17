const express = require("express");
const getProdcutsDeleted = require("../../controllers/Products/getProductsDeleted");
const router = express.Router();

router.get("/products-deleted", getProdcutsDeleted);

module.exports = router;
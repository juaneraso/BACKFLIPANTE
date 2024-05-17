const express = require("express");
const getProductsById = require("../../controllers/Products/getProductById");
const router = express.Router();

router.get("/detail/:id", getProductsById);

module.exports = router;

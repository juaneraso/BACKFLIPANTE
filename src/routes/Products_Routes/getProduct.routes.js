const express = require("express");
const getProducts = require("../../controllers/Products/getProducts");
const router = express.Router();

router.get("/products", getProducts);

module.exports = router;

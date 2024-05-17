const express = require("express");
const getProductByPrice = require("../../controllers/Products/getProductsByPrice"); // Cambiar a getProductByPrice
const router = express.Router();

router.get("/filter/:desde/:hasta", getProductByPrice);

module.exports = router;

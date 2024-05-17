const express = require("express");
const postProducts = require("../../controllers/Products/postProduct");
const router = express.Router();

router.post("/products", postProducts);

module.exports = router;

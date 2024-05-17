const express = require("express");
const deleteProducts = require("../../controllers/Products/deleteProducts");
const router = express.Router();

router.delete("/products/:id", deleteProducts);

module.exports = router;

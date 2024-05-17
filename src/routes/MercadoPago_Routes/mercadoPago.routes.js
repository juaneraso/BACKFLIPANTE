const express = require("express");
const mercadoPago = require("../../controllers/MercadoPago/mercadoPago");
const router = express.Router();

router.post("/create_preference", mercadoPago);

module.exports = router;

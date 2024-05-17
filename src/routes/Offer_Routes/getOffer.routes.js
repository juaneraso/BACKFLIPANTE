const express = require("express");
const router = express.Router();
const getOffer = require("../../controllers/Offers/getOffer");

// Ruta para marcar un producto como favorito por un usuario
router.get("/offer", getOffer);

module.exports = router;
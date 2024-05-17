const express = require("express");
const router = express.Router();
const postOffer = require("../../controllers/Offers/postOffer");

// Ruta para marcar un producto como favorito por un usuario
router.post("/offer", postOffer);

module.exports = router;

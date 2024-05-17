const express = require("express");
const router = express.Router();
const deleteOffer = require("../../controllers/Offers/deleteOffer");

// Ruta para marcar un producto como favorito por un usuario
router.delete("/offer/:id", deleteOffer);

module.exports = router;

const express = require("express");
const router = express.Router();
const updateOffer = require("../../controllers/Offers/updateOffer");

// Ruta para marcar un producto como favorito por un usuario
router.put("/offer/:id", updateOffer);

module.exports = router;

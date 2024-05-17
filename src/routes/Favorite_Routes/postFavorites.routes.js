const express = require("express");
const router = express.Router();
const postFavorite = require("../../controllers/Favorites/postFavorite");

// Ruta para marcar un producto como favorito por un usuario
router.post("/users/:userId/products/:productId/favorite", postFavorite);

module.exports = router;

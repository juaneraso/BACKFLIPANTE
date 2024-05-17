const express = require("express");
const router = express.Router();
const postCart = require("../../controllers/Cart/postCart");

// Ruta para agregar al carrito por un usuario
router.post("/:userId/:productId/:sizeId", postCart);

module.exports = router;

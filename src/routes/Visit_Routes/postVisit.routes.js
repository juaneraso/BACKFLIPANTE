const express = require("express");
const router = express.Router();
const countVisit = require("../../controllers/Visit/postVisit");

// Ruta para marcar un producto como favorito por un usuario
router.post("/visit", countVisit);

module.exports = router;

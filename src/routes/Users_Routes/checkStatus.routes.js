const express = require("express");
const router = express.Router();
const checkBannedStatus = require("../../controllers/Check Status/checkSstatus"); // Asegúrate de que la ruta sea correcta

// Ruta para verificar el estado de baneo
router.post("/check-banned-status", checkBannedStatus);

module.exports = router;

const express = require("express");
const deleteFav = require("../../controllers/Favorites/deleteFav");

const router = express.Router();

router.delete("/favorites/:userId/:productId", deleteFav);

module.exports = router;

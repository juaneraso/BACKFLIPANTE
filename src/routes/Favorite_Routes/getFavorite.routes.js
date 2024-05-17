const express = require("express");
const getFavorites = require("../../controllers/Favorites/getFavorites");

const router = express.Router();

router.get("/favorites/:userId", getFavorites);

module.exports = router;

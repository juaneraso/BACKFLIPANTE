const express = require("express");
const getUserByName = require("../../controllers/User/getUserByName");
const router = express.Router();

router.get("/profile/:name", getUserByName);

module.exports = router;

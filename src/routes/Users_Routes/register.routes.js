const express = require("express");
const registerUser = require("../../controllers/User/registerUser");
const router = express.Router();

router.post("/register", registerUser);

module.exports = router;

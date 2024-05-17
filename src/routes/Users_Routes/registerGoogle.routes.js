const express = require("express");
const registerUser = require("../../controllers/User/postUserGoogle");
const router = express.Router();

router.post("/register-google", registerUser);

module.exports = router;

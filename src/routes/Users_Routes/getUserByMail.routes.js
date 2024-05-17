const express = require("express");
const getUserByMail = require("../../controllers/User/getUserByMail");
const router = express.Router();

router.get("/user/:email", getUserByMail);

module.exports = router;

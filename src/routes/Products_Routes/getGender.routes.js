const express = require("express");
const getGender = require("../../controllers/Products/getGender");
const router = express.Router();

router.get("/gender", getGender);

module.exports = router;

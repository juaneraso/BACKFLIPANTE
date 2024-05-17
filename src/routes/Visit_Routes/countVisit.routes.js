const express = require("express");
const getVisit = require("../../controllers/Visit/Visit");
const router = express.Router();

router.post("/visit", getVisit);

module.exports = router;

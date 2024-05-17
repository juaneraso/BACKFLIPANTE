const express = require("express");
const getVisit = require("../../controllers/Visit/getVisit");
const router = express.Router();

router.get("/visit", getVisit);

module.exports = router;

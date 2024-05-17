const express = require("express");
const filter = require("../../controllers/Filters/filter");

const router = express.Router();

router.post("/filter", filter);

module.exports = router;

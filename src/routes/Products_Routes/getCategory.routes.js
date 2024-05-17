const express = require("express");
const getCategory = require("../../controllers/Products/getCategory");
const router = express.Router();

router.get("/category", getCategory);

module.exports = router;

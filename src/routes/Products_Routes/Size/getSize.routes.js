const express = require("express");
const getSize = require("../../../controllers/Products/Size/getSize");
const router = express.Router();

router.get("/sizes", getSize);

module.exports = router;

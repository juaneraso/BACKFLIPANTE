const express = require("express");
const postSize = require("../../../controllers/Products/Size/postSize");
const router = express.Router();

router.post("/sizes", postSize);

module.exports = router;

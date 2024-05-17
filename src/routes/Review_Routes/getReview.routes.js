const express = require("express");
const getReviews = require("../../controllers/Reviews/getReviews");
const router = express.Router();

router.get("/reviews", getReviews);

module.exports = router;
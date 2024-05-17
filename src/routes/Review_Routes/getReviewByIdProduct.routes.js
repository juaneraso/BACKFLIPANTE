const express = require("express");
const getReviewsByProductId = require("../../controllers/Reviews/getReviewsByProductId");
const router = express.Router();

router.get("/reviews-product/:id", getReviewsByProductId);

module.exports = router;

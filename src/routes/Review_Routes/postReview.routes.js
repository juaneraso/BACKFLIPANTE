const express = require("express");
const postReview = require("../../controllers/Reviews/postReviews");
const router = express.Router();

router.post("/reviews/:userId/:productId", postReview);

module.exports = router;
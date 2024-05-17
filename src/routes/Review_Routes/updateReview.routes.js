const express = require("express");
const updateReview = require("../../controllers/Reviews/updateReviews");
const router = express.Router();

router.put("/reviews/:id", updateReview);

module.exports = router;

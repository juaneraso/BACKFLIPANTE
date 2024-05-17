const express = require("express");
const getReviewById = require("../../controllers/Reviews/getReviewsById");
const router = express.Router();

router.get("/reviews-user/:id", getReviewById);

module.exports = router;

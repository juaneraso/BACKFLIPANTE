const express = require("express");
const createReviews = require("../../controllers/Reviews/postMultipleReviews");
const router = express.Router();

router.post("/reviews-multiples", createReviews);

module.exports = router;

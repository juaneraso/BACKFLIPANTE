const express = require("express");
const deleteReviews = require("../../controllers/Reviews/deleteReviews");
const router = express.Router();

router.delete("/reviews/:id", deleteReviews);

module.exports = router;

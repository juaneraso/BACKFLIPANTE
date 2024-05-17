const express = require("express");
const updatePassword = require("../../controllers/User/changePassword");
const router = express.Router();

router.put("/update-password/:id", updatePassword);

module.exports = router;

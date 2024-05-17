const express = require("express");
const updateUser = require("../../controllers/User/updateUser");
const router = express.Router();

router.post("/update-user/:id", updateUser);

module.exports = router;

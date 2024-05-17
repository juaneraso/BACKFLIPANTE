const express = require("express");
const deleteUser = require("../../controllers/User/deleteUser");
const router = express.Router();

router.delete("/delete-user/:id", deleteUser);

module.exports = router;

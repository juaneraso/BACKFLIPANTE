const express = require("express");
const ModifyPassword = require("../../controllers/User/ModifyPassword");
const router = express.Router();

router.put("/modify-password/:id", ModifyPassword);

module.exports = router;

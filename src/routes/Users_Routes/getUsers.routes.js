const { Router } = require("express");
const getUsers = require("../../controllers/User/getUser");
const router = Router();

router.get("/users", getUsers);

module.exports = router;

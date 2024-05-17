const { Router } = require("express");
const getUserDeleted = require("../../controllers/User/getUserDelete");
const router = Router();

router.get("/users-deleted", getUserDeleted);

module.exports = router;

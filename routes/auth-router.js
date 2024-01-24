const router = require("express").Router();
const { join, leave } = require("../controllers/auth.controller");

router.post("/join", join);
router.post("/leave", leave);

module.exports = router;

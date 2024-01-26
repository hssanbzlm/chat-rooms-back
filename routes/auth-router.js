const router = require("express").Router();
const { join, leave } = require("../controllers/auth.controller");
const { asyncErrorHandler } = require("../middlewares/error.middleware");
router.post("/join", asyncErrorHandler(join));
router.post("/leave", leave);

module.exports = router;

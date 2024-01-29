const router = require("express").Router();
const { join, leave, getUserInfo } = require("../controllers/auth.controller");
const { asyncErrorHandler } = require("../middlewares/error.middleware");
const { protect } = require("../middlewares/protect.middleware");
router.get("/is-auth", protect, getUserInfo);
router.post("/join", asyncErrorHandler(join));
router.post("/leave", leave);

module.exports = router;

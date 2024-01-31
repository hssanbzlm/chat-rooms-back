const router = require("express").Router();
const { getMessages } = require("../controllers/message.controller");
const { asyncErrorHandler } = require("../middlewares/error.middleware");

router.get("/get-messages/:list", asyncErrorHandler(getMessages));

module.exports = router;

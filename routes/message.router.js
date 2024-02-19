const router = require("express").Router();
const {
  getMessages,
  getPrivateMessages,
} = require("../controllers/message.controller");
const { asyncErrorHandler } = require("../middlewares/error.middleware");

router.get("/get-messages/:list", asyncErrorHandler(getMessages));
router.get(
  "/get-private-messages/:userId/:list",
  asyncErrorHandler(getPrivateMessages)
);

module.exports = router;

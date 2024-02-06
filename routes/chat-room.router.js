const router = require("express").Router();
const {
  createRoom,
  DeleteRoom,
} = require("../controllers/chat-room.controller");
const { protect } = require("../middlewares/protect.middleware");
const { asyncErrorHandler } = require("../middlewares/error.middleware");

router.post("/create", asyncErrorHandler(createRoom));
router.delete("/destroy", protect, asyncErrorHandler(DeleteRoom));

module.exports = router;

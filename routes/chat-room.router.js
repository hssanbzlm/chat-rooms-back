const router = require("express").Router();
const {
  createRoom,
  DeleteRoom,
} = require("../middlewares/chat-room.middleware");
const { isAdmin } = require("../middlewares/user.middleware");
router.post("/create", createRoom);
router.delete("/destroy", isAdmin, DeleteRoom);

module.exports = router;

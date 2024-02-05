const router = require("express").Router();
const {
  createRoom,
  DeleteRoom,
} = require("../controllers/chat-room.controller");
const { isAdmin } = require("../middlewares/user.middleware");
const { protect } = require("../middlewares/protect.middleware");
router.post("/create", createRoom);
router.delete("/destroy", protect, isAdmin, DeleteRoom);

module.exports = router;

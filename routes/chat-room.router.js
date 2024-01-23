const router = require("express").Router();
const {
  createRoom,
  DeleteRoom,
} = require("../controllers/chat-room.controller");
const { isAdmin } = require("../middlewares/user.middleware");
router.post("/create", createRoom);
router.delete("/destroy", isAdmin, DeleteRoom);

module.exports = router;

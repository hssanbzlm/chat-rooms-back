const router = require("express").Router();
const { welcome } = require("../middlewares/chat-room.middleware");
router.get("/", welcome);

module.exports = router;

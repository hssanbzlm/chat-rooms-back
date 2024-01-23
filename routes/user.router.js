const router = require("express").Router();
const {
  handleExist,
  addUser,
  join,
  leave,
} = require("../controllers/user.controller");
const { checkUserExist } = require("../middlewares/user.middleware");
router.post("/check-exist", checkUserExist, handleExist);
router.post("/add", checkUserExist, addUser);
router.post("/join", join);
router.post("/leave", leave);
module.exports = router;

const router = require("express").Router();
const {
  checkUserExist,
  handleExist,
  addUser,
} = require("../middlewares/user.middleware");
router.post("/check-exist", checkUserExist, handleExist);
router.post("/add", checkUserExist, addUser);

module.exports = router;

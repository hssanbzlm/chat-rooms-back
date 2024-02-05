const router = require("express").Router();
const { addUser } = require("../controllers/user.controller");
const { checkUserExist } = require("../middlewares/user.middleware");
const { asyncErrorHandler } = require("../middlewares/error.middleware");

router.post(
  "/add",
  asyncErrorHandler(checkUserExist),
  asyncErrorHandler(addUser)
);
module.exports = router;

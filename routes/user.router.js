const router = require("express").Router();
const { addUser, updateUser } = require("../controllers/user.controller");
const { saveAvatar } = require("../middlewares/cloudinary.middleware");
const { checkUserExist } = require("../middlewares/user.middleware");
const { asyncErrorHandler } = require("../middlewares/error.middleware");
const { protect } = require("../middlewares/protect.middleware");
const upload = require("../middlewares/multer.middleware");

router.post(
  "/add",
  asyncErrorHandler(checkUserExist),
  asyncErrorHandler(addUser)
);
router.put(
  "/update",
  protect,
  upload.single("avatar"),
  asyncErrorHandler(saveAvatar),
  asyncErrorHandler(updateUser)
);
module.exports = router;

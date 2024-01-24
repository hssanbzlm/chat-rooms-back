const router = require("express").Router();
const { handleExist, addUser } = require("../controllers/user.controller");
const { checkUserExist } = require("../middlewares/user.middleware");
router.post("/check-exist", checkUserExist, handleExist);
router.post("/add", checkUserExist, addUser);
module.exports = router;

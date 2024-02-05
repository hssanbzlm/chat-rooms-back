const router = require("express").Router();
const { addUser } = require("../controllers/user.controller");
const { checkUserExist } = require("../middlewares/user.middleware");
router.post("/add", checkUserExist, addUser);
module.exports = router;

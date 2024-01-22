const router = require("express").Router();
const { welcome } = require("../middlewares/user.middleware");
router.get("/", welcome);

module.exports = router;

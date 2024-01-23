const { verifyToken } = require("../utils/token.util");
const { key } = require("../config");
module.exports.protect = (req, res, next) => {
  const token = req.cookies["auth-token"];
  const verif = verifyToken(token, key);
  if (verif) next();
  else res.end("You are not authorized");
};

const { verifyToken } = require("../utils/token.util");
const { key } = require("../config");
module.exports.protect = (req, res, next) => {
  const verif = verifyToken(token, key);
  if (verif) next();
  else res.status(403).send("access forbidden");
};

module.exports.checkUserExist = async (req, res, next) => {
  const { userName } = req.body;
  const doc = await user.findOne({ userName });
  if (doc) {
    req.existence = true;
  } else {
    req.existence = false;
  }
  next();
};

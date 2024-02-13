const envConfig = require("../config");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: envConfig.cloudinaryName,
  api_key: envConfig.cloudinaryApikey,
  api_secret: envConfig.cloudinaryApiSecret,
});

module.exports.saveAvatar = async (req, res, next) => {
  if (req.file) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const response = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
    });
    if (response.secure_url) {
      req.avatar = response.secure_url;
      next();
    } else res.satus(501).send("Error while saving new avatar");
  } else next();
};

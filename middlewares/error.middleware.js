module.exports.errorHandler = (err, req, res, next) => {
  res.status(500).json({ error: err.message });
};

module.exports.asyncErrorHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

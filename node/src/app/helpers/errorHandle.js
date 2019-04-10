
exports.errorHandle = function(req, res, err, next, _status=404, _message='Not found'){
  req.error = {
    message: _message,
    status: _status
  }

  next(err);
};

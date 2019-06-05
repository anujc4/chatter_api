exports.makeError = function(status, message) {
  let error = new Error(message);
  error.statusCode = status;
  return error;
};

exports.errorJson = function(error) {
  return {
    error: true,
    message: error.message || "Something went wrong"
  };
};

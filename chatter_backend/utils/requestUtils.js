var C = require("./constant");

exports.getLimit = function(req) {
  limit =
    parseInt(req.body.limit) ||
    parseInt(req.query.limit) ||
    C.DEFAULT_MAX_LIMIT;
  if (limit) {
    if (limit > C.DEFAULT_MAX_LIMIT || limit.isNan)
      return C.DEFAULT_MAX_LIMIT;
    else return limit;
  } else return C.DEFAULT_MAX_LIMIT;
};

exports.getOffset = function(req) {
  offset =
    parseInt(req.body.offset) || parseInt(req.query.offset) || C.DEFAULT_OFFSET;
  if (offset) {
    if (offset.isNan) return C.DEFAULT_OFFSET;
    else return offset;
  } else return C.DEFAULT_OFFSET;
};

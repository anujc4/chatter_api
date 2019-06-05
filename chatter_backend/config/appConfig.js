exports.ENV = process.env.NODE_ENV || "development";
exports.PORT = process.env.LISTENING_PORT || 3000;

exports.MONGO_HOST =
  process.env.MONGO_HOST || "mongodb://localhost/chatter_dev";

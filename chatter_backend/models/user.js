var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var crypto = require("crypto");

var UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      index: true
    },
    email: {
      type: String,
      unique: true,
      index: true
    },
    firstName: String,
    lastName: String,
    password: String,
    enabled: { type: Boolean, default: true }
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.methods.validPassword = function(password) {
  return this.password === getPasswordHash(password);
};

UserSchema.methods.setPassword = function(password) {
  this.password = getPasswordHash(password);
};

getPasswordHash = function(password) {
  return crypto
    .createHash("sha256")
    .update(password)
    .digest("base64");
};

UserSchema.methods.toJSON = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName
  };
};

exports.User = mongoose.model("User", UserSchema);


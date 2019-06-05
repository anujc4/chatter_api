var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;
var moment = require("moment");
var User = require("./user").User;

var ChatSchema = new Schema(
  {
    _id: {
      type: ObjectIdSchema,
      default: new ObjectId()
    },
    fromUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true
    },
    toUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    message: String
  },
  { timestamps: true }
);

ChatSchema.pre("save", function(next) {
  console.log("Yahaan aaya");
  console.log(this.fromUser, typeof this.fromUser);
  console.log(this.toUser, typeof this.toUser);
  if (this.fromUser == this.toUser)
    next(new Error("from and to user cannot be the same"));
  else next();
});

ChatSchema.methods.toJSON = function() {
  return {
    id: this._id,
    message: this.message,
    sentDate: moment(this.createdAt).format("DD/MM/YYYY"),
    sentTime: moment(this.createdAt).format("HH:mm:ss")
  };
};

exports.Chat = mongoose.model("Chat", ChatSchema);

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/chatter_dev");
mongoose.connection
  .once("open", function() {
    console.log("Connected to MongoDB...");
  })
  .on("error", function(error) {
    console.error("Error connecting to Mongo DB\n", error);
  });
mongoose.set("debug", true);

module.exports = mongoose;
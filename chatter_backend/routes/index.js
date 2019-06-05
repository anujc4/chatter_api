var express = require("express")
var router = require("express").Router();

router.get("/", function(_req, res) {
  res.send("Chatter up and running");
});

router.use("/chatter", express.static("public"));

module.exports = router;

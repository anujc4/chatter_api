var router = require("express").Router();
var User = require("../models/user").User;
var Chat = require("../models/chat").Chat;
var RequestUtils = require("../utils/requestUtils");

router.get("/from/:fromUser/to/:toUser", function(req, res) {
  query = {
    fromUser: req.params.fromUser,
    toUser: req.params.toUser
  };
  Chat.find(query)
    .sort("-createdAt")
    .limit(RequestUtils.getLimit(req))
    .skip(RequestUtils.getOffset(req))
    .then(function(resp) {
      res.json(resp);
    });
});

router.post("/", function(req, res) {
  chat = new Chat();
  request = req.body;
  chat.fromUser = request.fromUser;
  chat.toUser = request.toUser;
  chat.message = request.message;
  console.log("Executing this");

  chat
    .save()
    .then(function() {
      console.log("Executing this 2");
      return res.json({ chat });
    })
    .catch(function(e) {
      console.log(e);
      res.json({ error: e.message });
    });
});

router.delete("/:id", function(req, res) {
  User.deleteOne({ _id: req.params.id }).then(function(resp) {
    res.send(resp);
  });
});

module.exports = router;

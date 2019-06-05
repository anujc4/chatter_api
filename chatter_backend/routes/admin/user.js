var router = require("express").Router();
var User = require("../../models/user").User;
var RequestUtils = require("../../utils/requestUtils");

router.get("/:id", function(req, res) {
  User.findById(req.params.id).then(function(resp) {
    if (resp) res.send(resp);
    else
      res.status(404).json({ error: "The requested resource was not found." });
  });
});

router.get("/", function(req, res) {
  User.find()
    .limit(RequestUtils.getLimit(req))
    .skip(RequestUtils.getOffset(req))
    .then(function(resp) {
      res.send(resp);
    });
});

router.delete("/:id", function(req, res) {
  console.log(req.params.id);
  User.deleteOne({ _id: req.params.id }).then(function(resp) {
    res.send(resp);
  });
});

module.exports = router;

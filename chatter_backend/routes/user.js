var router = require("express").Router();
var User = require("../models/user").User;
var validator = require("express-validator/check");
var validationResult = require("express-validator/check").validationResult;
var error = require("../utils/error_helper").makeError;
var RequestUtils = require("../utils/requestUtils");

router.get("/", function(req, res) {
  User.find()
    .limit(RequestUtils.getLimit(req))
    .skip(RequestUtils.getOffset(req))
    .then(function(resp) {
      res.send(resp);
    });
});

var rules = [
  validator
    .body("email")
    .isEmail()
    .normalizeEmail(),
  validator
    .body("firstName")
    .isAlpha()
    .trim(),
  validator
    .body("lastName")
    .isAlpha()
    .trim(),
  validator
    .body("username")
    .isLowercase()
    .trim()
];

router.post("/login", async function(req, res, next) {
  try {
    user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.validPassword(req.body.password)) {
        res.send(user);
      } else {
        throw error(400, "Invalid password.");
      }
    } else {
      throw error(400, "Email does not exist. Please register and sign in.");
    }
  } catch (err) {
    console.log("Catching error here");
    next(err);
  }
});

router.post("/", rules, function(req, res) {
  var errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.enabled = true;
  user.setPassword(req.body.password);

  user
    .save()
    .then(function() {
      return res.json({ user: user.toJSON() });
    })
    .catch(function(e) {
      res.json({ error: e.message });
    });
});

router.put("/:id", function(req, res) {
  var user = {};
  if (req.body.firstName !== undefined) user.firstName = req.body.firstName;
  if (req.body.lastName !== undefined) user.lastName = req.body.lastName;

  User.findOneAndUpdate({ _id: req.params.id }, user).then(function(resp) {
    return res.json(resp.toJSON());
  });
});

router.post("/:id/password/change", function(req, res) {
  User.findById(req.params.id).then(function(user) {
    user.setPassword(req.body.password);
    user.save().then(function(resp) {
      res.json(resp.toJSON());
    });
  });
});

module.exports = router;

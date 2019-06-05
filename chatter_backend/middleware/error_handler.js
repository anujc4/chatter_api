const router = require("express").Router();
const helper = require("../utils/error_helper");

router.use((err, _req, resp, next) => {
  console.error(err);
  console.error("------> ", helper.errorJson(err));
  if (err.statusCode) resp.status(err.statusCode).send(helper.errorJson(err));
  else next();
});

router.use((err, _req, resp, _next) => {
  resp.status(500).send(err);
});

module.exports = router;

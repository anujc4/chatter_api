require("dotenv").config();
const express = require("express");
const app = express();
const config = require("./config/appConfig");
const port = config.PORT;
const expressWs = require("express-ws")(app);
const helper = require("./utils/error_helper");
const morgan = require("morgan");
const bodyParser = require("body-parser");

require("./product/db");

const indexRouter = require("./routes/index");
const adminUserRouter = require("./routes/admin/user");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const socketRouter = require("./routes/web_scoket");
const Clients = require("./utils/ws_helper");

if (config.ENV !== "test") {
  app.use(morgan("combined"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/api/v1/admin/user", adminUserRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);

clients = new Clients();

const setupSocketMiddleware = function(req, _res, next) {
  console.log("Attaching socket to express");
  req.webSocket = expressWs.getWss();
  req.clients = clients;
  next();
};

app.use("/sock/v1", setupSocketMiddleware);
app.use("/sock/v1", socketRouter);

app.use((err, _req, resp, _next) => {
  console.error("Caught error: ", err);
  if (err.statusCode) {
    resp.status(err.statusCode).send(helper.errorJson(err));
  } else {
    resp.status(500).send(err);
  }
});

app.listen(port, function() {
  console.log("Chatter app listening on port: " + port);
});

// Export the app to run tests
exports.app = app;

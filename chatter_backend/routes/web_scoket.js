var express = require("express");
var router = express.Router();
var connections = {};
// const uuid = require("uuid/v4");

router.ws("/message", function(ws, req) {
  ws.on("message", function(obj) {
    try {
      msgPayload = JSON.parse(obj);
      console.log("MESSAGE PAYLOAD", msgPayload);
      req.clients.saveClient(msgPayload.senderId, ws);
      receiver = req.clients.find(msgPayload.receiverId);
      console.log("CLIENT SEARCH", receiver);
      if (receiver) {
        console.log("SEND ", receiver.id, " message: ", msgPayload.message);
        receiver.send(msgPayload.message);
      } else {
        console.log("Not sending message");
      }
    } catch (e) {
      console.log("CAUGHT ERROR", e);
    }
    // console.log("Websocket clients", req.webSocket.clients);
    // ws.send(msg);
  });
});

module.exports = router;

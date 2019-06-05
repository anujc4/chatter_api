import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import ChatList from "./ChatList";
import * as C from "./utils/constants";
import "./ChatApp.css";
const uuidv1 = require("uuid/v1");

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    let authToken = JSON.parse(localStorage.getItem(C.AUTH_TOKEN_KEY));
    let socket = new WebSocket(C.WS_URL);
    socket.onopen = () => {
      let messagePayload = {
        senderId: authToken.id,
        receiverId: "",
        message: "ACK"
      };
      socket.send(JSON.stringify(messagePayload));
    };
    this.state = {
      items: [],
      text: "",
      authToken,
      socket,
      users: [],
      apiError: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setupData();
  }

  successHandler = res => {
    console.log("Users List response", res);
    let users = this.state.users.slice();
    users = users.concat(res.filter(x => x.id !== this.state.authToken.id));
    this.setState({ users });
  };

  failureHandler = err => {
    console.log("API ERROR", err);
  };

  setupData = () => {
    let opts = {
      method: "GET",
      headers: {}
    };

    fetch(C.USERS_LIST_ENDPOINT, opts)
      .then(res => res.json())
      .then(this.successHandler, this.failureHandler)
      .catch(this.failureHandler);

    let socket = this.state.socket;

    // socket.addEventListener("open", function(event) {
    //   // console.log("Socket opened", event);
    // });

    socket.addEventListener(
      "message",
      function(event) {
        console.log("Message from server ", event.data);
        let items = this.state.items.slice();
        items.push({ id: uuidv1(), text: event.data });
        this.setState({ items });
      }.bind(this)
    );
  };

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.text) {
      let items = this.state.items.slice();
      items.push({ id: uuidv1(), text: this.state.text });
      this.setState({ items });
      try {
        let receiver = this.state.users[0].id;
        let messagePayload = {
          senderId: this.state.authToken.id,
          receiverId: receiver,
          message: this.state.text
        };
        console.log("Sending message to socket", messagePayload);
        this.state.socket.send(JSON.stringify(messagePayload));
      } catch (e) {
        console.error("Error", this.state.users);
      }
    }
  };

  validateText() {
    return this.state.text.length > 0;
  }

  render() {
    return (
      <div>
        <ChatList items={this.state.items} />
        <Form className="MessageBox">
          <Form.Row>
            <Col>
              <Form.Control
                input="text"
                placeholder="Enter something here"
                onChange={this.handleChange}
                value={this.state.text}
              />
            </Col>
            <Col md="auto">
              <Button
                block
                disabled={!this.validateText()}
                variant="primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

export default ChatApp;

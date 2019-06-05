import React, { Component } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Alert,
  Jumbotron
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./Login.css";
import * as C from "./utils/constants";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginError: false
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      loginError: false,
      errorMessage: ""
    });
  };

  successHandler = result => {
    console.log("Login API resp", result);
    if (result.error) {
      this.setState({ loginError: true, errorMessage: result.message });
    } else {
      localStorage.setItem(C.AUTH_TOKEN_KEY, JSON.stringify(result));
      this.setState({
        loggedInSuccessfully: true,
        loginToken: JSON.stringify(result)
      });
    }
  };

  failureHandler = result => {
    console.log("Login API Failure", result);
    this.setState({
      loginError: true,
      errorMessage: result.message || "Unable to process your request."
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    };

    fetch(C.LOGIN_ENDPOINT, opts)
      .then(res => res.json())
      .then(this.successHandler, this.failureHandler)
      .catch(this.failureHandler);
  };

  render() {
    if (this.state.loggedInSuccessfully === true) {
      console.log("Routing");
      return <Redirect to="/chat" />;
    }
    const handleAlert = () => {
      return (
        <Alert key="danger" variant="danger">
          {this.state.errorMessage}
        </Alert>
      );
    };

    return (
      <Jumbotron>
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email">
              <FormLabel>Email</FormLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password">
              <FormLabel>Password</FormLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>

            {this.state.loginError ? handleAlert() : null}

            <Button block disabled={!this.validateForm()} type="submit">
              Login
            </Button>
          </form>
        </div>
      </Jumbotron>
    );
  }
}

import React from "react";
import "./App.css";
import Login from "./Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ChatApp from "./ChatApp";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/login/" component={Login} />
        <Route path="/chat" component={ChatApp} />
      </Router>
    </div>
  );
}

export default App;

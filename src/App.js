import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header/index";
import SignIn from "./components/authentication/signin";
import SignUp from "./components/authentication/signup";
import Home from "./components/home/index";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <>
            <Header />
            {/* <Switch> */}
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            {/* </Switch> */}
          </>
        </Router>
      </div>
    );
  }
}

export default App;

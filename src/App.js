import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header/index";
import SignIn from "./components/authentication/signin";
import SignUp from "./components/authentication/signup";
import Main from "./components/main";
import AddCouce from "./components/cources/addNewCource";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <>
            <Header />
            <Switch>
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/cources" component={AddCouce} />
              <Route path="/" component={Main} />
            </Switch>
          </>
        </Router>
      </div>
    );
  }
}

export default App;

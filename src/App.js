import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/authentication/signin";
import Main from "./containers/Main";
import AddStudent from "./components/authentication/registrationForm";
import { v1 } from "uuid";

class App extends Component {
  constructor(props) {
      super(props);
  }


  render() {
    return (
        <div>
          <Router>
            <>
              <Switch>
                <Route
                    path="/registration"
                    component={ AddStudent }/>
                <Route
                    path="/signin"
                    component={SignIn} />
                <Route
                    path="/"
                    component= { Main }
                />
              </Switch>
            </>
          </Router>
        </div>
    );
  }
}
export default App;

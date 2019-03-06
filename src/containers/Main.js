import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from "../components/header/index";
import AddCource from "../components/cources/index";
import AddStatuse from "../components/statuses";
import Students from "./Students";
import FireManager from "../firebase/FireManager";

class Main extends Component {
  render() {
    return (
      <div>
        <Router>
          <>
            <Header />
            <Switch>
              <Route path="/cources" component={AddCource} />
              <Route path="/statuses" component={AddStatuse} />
              <Route exact path="/" component={Students} />
              <Route exact path="/students" component={Students} />
              <Redirect to="/students" />
            </Switch>
          </>
        </Router>
      </div>
    );
  }
}

export default Main;

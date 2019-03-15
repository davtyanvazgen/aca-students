import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import AddCource from "../cources";
import AddStatuse from "../statuses";
import Students from "../../containers/students";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

const Main = ({ auth }) => {
  return !isLoaded(auth) ? (
    <div className="lds-hourglass" />
  ) : isEmpty(auth) ? (
    <Redirect to="/signin" />
  ) : (
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
          <Footer />
        </>
      </Router>
    </div>
  );
};

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(Main);

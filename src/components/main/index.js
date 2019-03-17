import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import AddCourse from "../courses";
import AddStatus from "../statuses";
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
            <Route path="/courses" component={AddCourse} />
            <Route path="/statuses" component={AddStatus} />
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
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth }))
)(Main);

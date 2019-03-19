import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AddCourse from "../../components/courses";
import AddStatus from "../../components/statuses";
import Students from "../students/students";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase/index";
import { connect } from "react-redux";
import { compose } from "redux/index";

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

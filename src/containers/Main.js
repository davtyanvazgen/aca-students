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
import { v1 } from "uuid";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cources: [],
      getCourcesError: "",
      newCource: "",
      newStatuse: "",
      statuses: [],
      getStatuseError: "",
      students: [],
      getStudentsError: ""
    };
  }

  static getCourcesFB() {
    return this.state.cources;
  }

  componentDidMount() {
    FireManager.getCources()
      .then(querySnapshot => {
        this.setState({ cources: querySnapshot.docs.map(doc => doc.data()) });
      })
      .catch(err => {
        this.setState({ getCourcesError: err.message });
      });

    FireManager.getStatuses()
      .then(querySnapshot => {
        this.setState({ statuses: querySnapshot.docs.map(doc => doc.data()) });
      })
      .catch(err => {
        this.setState({ getStatusesError: err.message });
      });
    FireManager.getStudents()
      .then(querySnapshot => {
        this.setState({ students: querySnapshot.docs.map(doc => doc.data()) });
      })
      .catch(err => {
        this.setState({ getStudentsError: err.message });
      });
  }

  addNewCource = (e, value) => {
    e.preventDefault();

    const newCource = {
      name: value,
      id: v1()
    };
    if (!newCource.name.trim()) {
      this.setState({ newCource: "" });
      return;
    }
    FireManager.addCource(newCource)
      .then(() => {
        const cources = this.state.cources;
        this.setState({
          cources: [...cources, newCource]
        });
      })
      .catch(err => {
        this.setState({ addCourceError: err && err.message });
      });

    this.setState({ newCource: "" });
  };

  removeCource = cource => {
    FireManager.removeCource(cource)
      .then(() => {
        const oldCources = this.state.cources;
        const newCources = oldCources.filter(el => el.id !== cource.id);
        this.setState({
          cources: newCources
        });
      })
      .catch(err => {
        this.setState({ removeCourceError: err && err.message });
      });
  };

  addNewStatuse = (e, value) => {
    e.preventDefault();
    const newStatuse = {
      name: value,
      id: v1()
    };
    if (!newStatuse.name.trim()) {
      this.setState({ newStatuse: "" });
      return;
    }
    FireManager.addStatuse(newStatuse)
      .then(() => {
        const statuses = this.state.statuses;
        this.setState({
          statuses: [...statuses, newStatuse]
        });
      })
      .catch(err => {
        this.setState({ addStatuseError: err && err.message });
      });

    this.setState({ newStatuse: "" });
  };

  removeStatuse = statuse => {
    if (statuse.name.toLocaleLowerCase() === "apply") {
      alert(" This is the default status. Unable to delete.");
      return;
    }
    FireManager.removeStatuse(statuse).catch(err => {
      this.setState({ removeStatuseError: err && err.message });
    });
    const oldStatuses = this.state.statuses;
    const newStatuses = oldStatuses.filter(el => el.id !== statuse.id);
    this.setState({
      statuses: newStatuses
    });
  };

  editStatuse = statuse => {
    FireManager.editStatuse(statuse)
      .then(() => {
        const statusesArr = this.state.statuses;
        const index = statusesArr.findIndex(el => el.id === statuse.id);
        statusesArr[index].name = statuse.name;
        this.setState({
          statuses: [...index]
        });
      })
      .catch(err => {
        this.setState({ removeStatuseError: err && err.message });
      });
  };

  removeStudent = student => {
    FireManager.removeStudent(student)
      .then(() => {
        const oldStudents = this.state.students;
        const newStudents = oldStudents.filter(el => el.id !== student.id);
        this.setState({
          students: newStudents
        });
      })
      .catch(err => {
        this.setState({ removeStudentError: err && err.message });
      });
  };

  render() {
    return (
      <div>
        <Router>
          <>
            <Header />
            <Switch>
              <Route
                path="/cources"
                component={() => (
                  <AddCource
                    addNewCource={this.addNewCource}
                    removeCource={this.removeCource}
                    cources={this.state.cources}
                    students={this.state.students}
                    removeStudent={this.removeStudent}
                  />
                )}
              />
              <Route
                path="/statuses"
                component={() => (
                  <AddStatuse
                    statuses={this.state.statuses}
                    addNewStatuse={this.addNewStatuse}
                    removeStatuse={this.removeStatuse}
                    editStatuse={this.editStatuse}
                  />
                )}
              />
              <Route
                exact
                path="/"
                component={() => (
                  <Students
                    statuses={this.state.statuses}
                    cources={this.state.cources}
                    students={this.state.students}
                    removeStudent={this.removeStudent}
                  />
                )}
              />
              <Route
                exact
                path="/students"
                component={() => (
                  <Students
                    statuses={this.state.statuses}
                    cources={this.state.cources}
                    students={this.state.students}
                    removeStudent={this.removeStudent}
                  />
                )}
              />
              <Redirect to="/students" />
            </Switch>
          </>
        </Router>
      </div>
    );
  }
}

export default Main;

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch ,Redirect} from "react-router-dom";
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
            students: [],
            getStudentsError: ""
        }
    }

    componentDidMount () {
        FireManager.getStudents()
            .then(querySnapshot => {
                this.setState({ students: querySnapshot.docs.map(doc => doc.data()) });
            })
            .catch(err => {
                this.setState({ getStudentsError: err.message });
            });
    }

    editStatuse = statuse => {
        FireManager.editStatuse(statuse)
            .then(() => {
                const statusesArr = this.state.statuses;
                const index = statusesArr.findIndex(el => (el.id === statuse.id));
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
                    <Header/>
                    <Switch>
                        <Route
                            path="/cources"
                            component={ AddCource }
                        />
                        <Route
                            path="/statuses"
                            component={ AddStatuse }
                        />
                        <Route
                            exact path="/"
                            component= { Students }
                        />
                        <Route
                            exact path="/students"
                            component= { () =>
                                <Students
                                    statuses={ this.state.statuses }
                                    cources={ this.state.cources }
                                    students={ this.state.students }
                                    removeStudent={this.removeStudent}
                                />
                            }
                        />
                        <Redirect to = '/students'/>
                    </Switch>
                    </>
                </Router>
            </div>
        );
    }
}

export default Main;

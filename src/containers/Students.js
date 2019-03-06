import React, { Component } from "react";
import CourcesButton from "../components/students/courcesButtonGroup";
import StatusesButton from "../components/students/statusesButtonGroup";
import StudentCard from "../components/students/studentCard";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class Students extends Component {
  state = {
    withStatusStudents: [],
    withCourcesStudents: [],
    selectedCource: [],
    selectedStatus: [],
    showStudentsArr: this.props.students
  };

  filterStudents = () => {
    let { selectedCource, selectedStatus } = this.state;
    let { students } = this.props;
    let filters = selectedStatus.length
      ? [...selectedCource, selectedStatus[0]]
      : [...selectedCource];
    let resultArr = [];

    if (!selectedStatus.length && selectedCource.length) {
      resultArr = students.filter(
        student => filters.indexOf(student.cource) !== -1
      );
    }
    if (selectedStatus.length && !selectedCource.length) {
      resultArr = students.filter(
        student => filters.indexOf(student.status) !== -1
      );
    }
    if (selectedStatus.length && selectedCource.length) {
      resultArr = students.filter(
        student =>
          filters.indexOf(student.status) !== -1 &&
          filters.indexOf(student.cource) !== -1
      );
    }
    if (!selectedStatus.length && !selectedCource.length) {
      resultArr = students;
    }

    this.setState({
      showStudentsArr: resultArr
    });
  };
  courceStudents = cource => {
    const { selectedCource } = this.state;
    if (selectedCource.indexOf(cource.id) === -1) {
      selectedCource.push(cource.id);
      this.setState({
        selectedCource
      });
    } else {
      selectedCource.splice(selectedCource.indexOf(cource.id), 1);
      this.setState({
        selectedCource
      });
    }

    this.filterStudents();
  };
  statuseStudents = status => {
    let { selectedStatus } = this.state;
    if (status !== "all") {
      if (selectedStatus.length) {
        selectedStatus.pop();
      }
      selectedStatus.push(status.id);
      this.setState({
        selectedStatus
      });
    } else {
      selectedStatus.pop();
      this.setState({
        selectedStatus
      });
    }
    this.filterStudents();
  };

  repeatFiltering = () => {
    this.filterStudents();
  };

  render() {
    const {
      withCourcesStudents,
      withStatusStudents,
      showStudentsArr
    } = this.state;
    return (
      <div className="container border border-primary">
        <div className="row">
          <div className="col-12 border border-primary">
            <CourcesButton courceStudents={this.courceStudents} />
          </div>
        </div>
        <div className="row">
          <div className="col-2 border border-primary">
            <StatusesButton statuseStudents={this.statuseStudents} />
          </div>
          <div className="col-10 row container border border-primary">
            {this.state.showStudentsArr &&
              this.state.showStudentsArr.map(student => (
                <StudentCard
                  key={student.id}
                  student={student}
                  repeatFiltering={this.repeatFiltering}
                  allCources={this.props.cources}
                  allStatuses={this.props.statuses}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}
export default compose(
  firestoreConnect(() => ["students", "statuses", "cources"]), // or { collection: 'todos' }
  connect((state, props) => ({
    students: state.firestore.ordered.students,
    statuses: state.firestore.ordered.statuses,
    cources: state.firestore.ordered.cources
  }))
)(Students);

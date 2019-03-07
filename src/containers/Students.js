import React, { Component } from "react";
import CourcesButton from "../components/students/courcesButtonGroup";
import StatusesButton from "../components/students/statusesButtonGroup";
import StudentCard from "../components/students/studentCard";
import { setFilter } from "../store/actions";
import { visibilityFilters } from "../store/actions";
import Input from "reactstrap/es/Input";

class Students extends Component {
  state = {
    selectedCource: [],
    selectedStatus: [],
    serchedStudents: this.props.students,
    isSearch: false
  };

  handleSearch = e => {
    if (e.target.value === "") {
      this.setState({
        isSearch: false
      });
      return;
    }
    let { students } = this.props;
    let value = e.target.value;
    let resultArr = [];
    for (let i = 0; i < students.length; i++) {
      let counter = 0;
      for (let j = 0; j < value.length; j++) {
        if (students[i].fullName[j] === value[j]) {
          counter++;
        }
      }
      if (counter === value.length) {
        resultArr.push(students[i]);
      }
    }
    this.setState({
      serchedStudents: resultArr,
      isSearch: true
    });
  };

  filterStudents = () => {
    let { selectedCource, selectedStatus } = this.state;
    let filters = selectedStatus.length
      ? [...selectedCource, selectedStatus[0]]
      : [...selectedCource];

    if (!selectedStatus.length && selectedCource.length) {
      this.props.dispatch(
        setFilter(visibilityFilters.SHOW_WITH_COURCES, filters)
      );
    }
    if (selectedStatus.length && !selectedCource.length) {
      this.props.dispatch(
        setFilter(visibilityFilters.SHOW_WITH_STATUS, filters)
      );
    }
    if (selectedStatus.length && selectedCource.length) {
      this.props.dispatch(
        setFilter(visibilityFilters.SHOW_WITH_COURCES_AND_STATUS, filters)
      );
    }
    if (!selectedStatus.length && !selectedCource.length) {
      this.props.dispatch(setFilter(visibilityFilters.SHOW_ALL, filters));
    }
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
            <Input onChange={this.handleSearch} />
          </div>
        </div>
        <div className="row">
          <div className="col-2 border border-primary">
            <StatusesButton statuseStudents={this.statuseStudents} />
          </div>
          <div className="col-10 row container border border-primary">
            {!this.state.isSearch
              ? this.props.students &&
                this.props.students.map(student => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    repeatFiltering={this.repeatFiltering}
                    filterStudents={this.filterStudents}
                  />
                ))
              : this.state.serchedStudents &&
                this.state.serchedStudents.map(student => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    repeatFiltering={this.repeatFiltering}
                    filterStudents={this.filterStudents}
                  />
                ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Students;

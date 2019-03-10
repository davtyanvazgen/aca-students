import React, { Component } from "react";
import CourcesButton from "../components/students/courcesButtonGroup";
import StatusesButton from "../components/students/statusesButtonGroup";
import StudentCard from "../components/students/studentCard";
import { setFilter } from "../store/actions";
import { visibilityFilters } from "../store/actions";
import Input from "reactstrap/es/Input";
import { Container, Row, Col } from "reactstrap";

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
    return (
      <>
        <Container>
          <Row style={{ border: "2px solid red" }}>
            <Col
              style={{ border: "2px solid black" }}
              sm={{ size: 10, offset: 2 }}
            >
              <CourcesButton courceStudents={this.courceStudents} />
              <Input onChange={this.handleSearch} />
            </Col>
          </Row>

          <Row style={{ border: "2px solid yellow" }}>
            <Col sm={{ size: 2 }} style={{ border: "2px solid green" }}>
              <StatusesButton statuseStudents={this.statuseStudents} />
            </Col>

            <Col sm={{ size: 10 }} style={{ border: "2px solid green" }}>
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
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Students;

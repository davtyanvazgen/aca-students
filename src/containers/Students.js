import React, { Component } from "react";
import CourcesButton from "../components/students/courcesButtonGroup"
import StatusesButton from "../components/students/statusesButtonGroup"
import StudentCard from "../components/students/studentCard";
import { setFilter } from "../store/actions";
import { visibilityFilters } from "../store/actions";
import Input from "reactstrap/es/Input";

class Students extends Component {
  state = {
    selectedCource:"",
    selectedStatus:"",
    searchValue: "",
  };

  filterStudents = (value = this.state.searchValue , cource = this.state.selectedCource, status = this.state.selectedStatus) => {
    console.log(this.props);
    this.setState({
      searchValue: value,
    });

    this.setState({
      selectedCource: cource,
    })

    this.setState({
      selectedStatus: status,
    })

    let selectedCources = this.props.selectedCources;
    if (selectedCources.indexOf(cource.id) === -1 && cource) {
      selectedCources.push(cource.id);
    } else {
      selectedCources.splice(selectedCources.indexOf(cource.id),1);
    }

    let  selectedStatuses = this.props.selectedStatuses;
    if (status !== "all") {
      if (selectedStatuses.length) {
        selectedStatuses.pop();
      }
      selectedStatuses.push(status.id);
    } else {
      selectedStatuses.pop();
    }


    if (!selectedStatuses.length && selectedCources.length) {
      this.props.dispatch(setFilter(visibilityFilters.SHOW_WITH_COURCES, selectedStatuses, selectedCources, value));
    }
    if (selectedStatuses.length && !selectedCources.length) {
      this.props.dispatch(setFilter(visibilityFilters.SHOW_WITH_STATUS, selectedStatuses, selectedCources, value));
    }
    if (selectedStatuses.length && selectedCources.length) {
      this.props.dispatch(setFilter(visibilityFilters.SHOW_WITH_COURCES_AND_STATUS, selectedStatuses, selectedCources, value));
    }
    if (!selectedStatuses.length && !selectedCources.length) {
      this.props.dispatch(setFilter(visibilityFilters.SHOW_ALL, selectedStatuses, selectedCources, value));
    }
  };

  courceStudents = (cource = this.state.selectedCource) => {
    this.setState({
      selectedCource: cource,
    })
    const {selectedCources} = this.state;
    if (selectedCources.indexOf(cource.id) === -1 && cource) {
      selectedCources.push(cource.id);
      this.setState({
        selectedCources
      })
    } else {
      selectedCources.splice(selectedCources.indexOf(cource.id),1);
      this.setState({
        selectedCources
      })
    }
    this.filterStudents();
  };

  statuseStudents = (status) => {
    let { selectedStatus } = this.state;
    if (status !== "all") {
      if (selectedStatus.length) {
        selectedStatus.pop();
      }
      selectedStatus.push(status.id);
      this.setState({
        selectedStatus
      })
    } else {
      selectedStatus.pop();
      this.setState({
        selectedStatus
      });
    }
    this.filterStudents();
  };

  render() {
    const { withCourcesStudents,withStatusStudents,showStudentsArr } = this.state;
    return (
        <div className="container border border-primary">
          <div className="row">
            <div className="col-12 border border-primary">
              <CourcesButton
                  courceStudents = { this.filterStudents }
              />
              <Input onChange={(e)=>this.filterStudents(e.target.value)}></Input>
            </div>
          </div>
          <div className="row">
            <div className="col-2 border border-primary">
              <StatusesButton
                  statuseStudents = { this.filterStudents }
              />
            </div>
            <div className="col-10 row container border border-primary">
              {this.props.students && this.props.students.map(student => (
                  <StudentCard
                      key={ student.id }
                      student= { student }
                      filterStudents = {this.filterStudents}
                  />))
              }
            </div>
          </div>
        </div>
    )
  }
}


export default Students;
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
    selectedCources:[],
    selectedStatus:[],
    searchValue: "",
    visibilityFilters: "",
  };

  filterStudents = (value = this.state.searchValue) => {
    this.setState({
      searchValue: value,
    });
    let { selectedCources ,selectedStatus } = this.state;
    let filters = selectedStatus.length ? [...selectedCources,selectedStatus[0]] : [...selectedCources];

    if (!selectedStatus.length && selectedCources.length) {
      this.props.dispatch(setFilter(visibilityFilters.SHOW_WITH_COURCES, filters, value));
      this.setState({visibilityFilters: visibilityFilters.SHOW_WITH_COURCES});
    }
    if (selectedStatus.length && !selectedCources.length) {
      this.props.dispatch(setFilter(visibilityFilters.SHOW_WITH_STATUS, filters, value));
      this.setState({visibilityFilters: visibilityFilters.SHOW_WITH_COURCES});
    }
    if (selectedStatus.length && selectedCources.length) {
      this.props.dispatch(setFilter(visibilityFilters.SHOW_WITH_COURCES_AND_STATUS, filters, value));
      this.setState({visibilityFilters: visibilityFilters.SHOW_WITH_COURCES});
    }
    if (!selectedStatus.length && !selectedCources.length) {
      this.props.dispatch(setFilter(visibilityFilters.SHOW_ALL, filters, value));
      this.setState({visibilityFilters: visibilityFilters.SHOW_WITH_COURCES});
    }
    //this.handleSearch();
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
                  courceStudents = { this.courceStudents }
              />
              <Input onChange={(e)=>this.filterStudents(e.target.value)}></Input>
            </div>
          </div>
          <div className="row">
            <div className="col-2 border border-primary">
              <StatusesButton
                  statuseStudents = {this.statuseStudents}
              />
            </div>
            <div className="col-10 row container border border-primary">
              {this.props.students && this.props.students.map(student => (
                  <StudentCard
                      key={ student.id }
                      student= { student }
                      repeatFiltering = {this.repeatFiltering}
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
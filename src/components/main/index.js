import React from "react";
import FireManager from "../../firebase/FireManager";
import CourcesButton from "./courcesButtonGroup";
import StatusesButton from "./statusesButtonGroup";
import StudentsList from "../students/studentsList";

class Main extends React.PureComponent {
  state = {
    students: [],
    withStatusStudents: [],
    withCourcesStudents: [],
    getStudentsError: "",
    statuses: [],
    cources: [],
    selectedCource: [],
    selectedStatus: [],
    showStudentsArr: [],
    forSmbat: ""
  };

  componentDidMount() {
    FireManager.getStudents()
      .then(querySnapshot => {
        this.setState({ students: querySnapshot.docs.map(doc => doc.data()) });
      })
      .catch(err => {
        this.setState({ getStudentsError: err.message });
      });

    FireManager.getCources()
      .then(querySnapshot => {
        this.setState({ cources: querySnapshot.docs.map(doc => doc.data()) });
      })
      .catch(err => {
        this.setState({ getStudentsError: err.message });
      });

    FireManager.getStatuses()
      .then(querySnapshot => {
        this.setState({ statuses: querySnapshot.docs.map(doc => doc.data()) });
      })
      .catch(err => {
        this.setState({ getStudentsError: err.message });
      });
  }

  filteredStudents = () => {
    let { selectedCource, selectedStatus, students } = this.state;
    let filters = selectedStatus.length
      ? [...selectedCource, selectedStatus[0]]
      : [...selectedCource];
    console.log(filters);
    let resultArr = [];
    console.log("resultArr skzbum", resultArr);
    if (!selectedStatus.length && selectedCource.length) {
      resultArr = students.filter(
        student => filters.indexOf(student.cource) !== -1
      );
      console.log("chka ka", resultArr);
    }
    if (selectedStatus.length && !selectedCource.length) {
      resultArr = students.filter(
        student => filters.indexOf(student.status) !== -1
      );
      console.log("ka chka", resultArr);
    }
    if (selectedStatus.length && selectedCource.length) {
      resultArr = students.filter(
        student =>
          filters.indexOf(student.status) !== -1 &&
          filters.indexOf(student.cource) !== -1
      );
      console.log("erkusn el ka", resultArr);
    }
    if (!selectedStatus.length && !selectedCource.length) {
      resultArr = students;
      console.log("wochmek chka");
    }
    console.log("resultArr werjnakan", resultArr);
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
      console.log("sexmwac curser@ this strateum", this.state.selectedCource);
    } else {
      selectedCource.splice(selectedCource.indexOf(cource.id), 1);
      this.setState({
        selectedCource
      });
      console.log(
        "sexmwac curser@ this strateum,2 qeys",
        this.state.selectedCource
      );
    }
    this.filteredStudents();
  };

  statuseStudents = status => {
    let { selectedStatus } = this.state;
    if (!selectedStatus.length || selectedStatus.indexOf(status.id) === -1) {
      if (selectedStatus.length) {
        selectedStatus.pop();
      }
      selectedStatus.push(status.id);
      this.setState({
        selectedStatus
      });

      console.log(
        "status arr arajin qeysum sttat =",
        this.state.selectedStatus
      );
    } else {
      selectedStatus.pop();
      this.setState({
        selectedStatus
      });
      console.log("status arr 2222 qeysum sttat = ", this.state.selectedStatus);
    }
    this.filteredStudents();
  };

  render() {
    const {
      students,
      statuses,
      cources,
      withCourcesStudents,
      withStatusStudents,
      showStudentsArr
    } = this.state;
    return (
      <div className="container border border-primary">
        <div className="row">
          <div className="col-12 border border-primary">
            <CourcesButton
              cources={cources}
              courceStudents={this.courceStudents}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-2 border border-primary">
            <StatusesButton
              statuses={statuses}
              statuseStudents={this.statuseStudents}
              filteredStudents={this.filteredStudents}
            />
          </div>
          <div className="col-10 row container border border-primary">
            <StudentsList
              cources={cources}
              statuses={statuses}
              allStudents={showStudentsArr}
              withStatusStudents={withStatusStudents}
              withCourcesStudents={withCourcesStudents}
              filteredStudents={this.filteredStudents}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

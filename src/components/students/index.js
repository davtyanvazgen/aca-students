import React from "react";
import FireManager from "../../firebase/FireManager";
import CourcesButton from "./courcesButtonGroup"
import StatusesButton from "./statusesButtonGroup"
import StudentsList from "../students/studentsList";
class Main extends React.PureComponent {
  state = {
    students: [],
    withStatusStudents:[],
    withCourcesStudents:[],
    getStudentsError: "",
    statuses: [],
    cources: [],
    selectedCource:[],
    selectedStatus:[],
    showStudentsArr:[]
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
  componentWillMount(){
    console.log('Main js unmounting')
    FireManager.getStudents();
    FireManager.getCources();
    FireManager.getStatuses();
  }
  filteredStudents = () => {
    let { selectedCource ,selectedStatus, students} = this.state;
    let filters = selectedStatus.length?[...selectedCource,selectedStatus[0]]:[...selectedCource];

    let resultArr = [];

    if (!selectedStatus.length && selectedCource.length) {

      resultArr = students.filter(student =>(filters.indexOf(student.cource) !== -1));

    }
    if (selectedStatus.length && !selectedCource.length) {
      resultArr = students.filter(student =>(filters.indexOf(student.status) !== -1));

    }
    if (selectedStatus.length && selectedCource.length) {
      resultArr = students.filter(student =>(filters.indexOf(student.status) !== -1)&& filters.indexOf(student.cource) !== -1);

    }
    if (!selectedStatus.length && !selectedCource.length) {
      resultArr = students;

    }

    this.setState ({
      showStudentsArr:resultArr
    })
  }
  toggleButton = () =>{
    console.log(this)
    debugger;
  }
  courceStudents = (cource) => {
    const {selectedCource} = this.state;
    if (selectedCource.indexOf(cource.id) === -1) {
      selectedCource.push(cource.id);
      this.setState({
        selectedCource
      })
    } else {
      selectedCource.splice(selectedCource.indexOf(cource.id),1);
      this.setState({
        selectedCource
      })
    }

    this.filteredStudents();
  }
  statuseStudents = (status) => {
    let { selectedStatus } = this.state;
    if (!selectedStatus.length || selectedStatus.indexOf(status.id) === -1) {
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
    this.filteredStudents();
  }
  repeatFiltering = () => {
    this.filteredStudents();
    this.componentDidMount();
  }
  render() {
    const { statuses, cources, withCourcesStudents,withStatusStudents,showStudentsArr } = this.state;
    return (
        <div className="container border border-primary">
          <div className="row">
            <div className="col-12 border border-primary">
              <CourcesButton
                  cources = { cources }
                  courceStudents = { this.courceStudents }
                  filteredStudents = {this.filteredStudents}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2 border border-primary">
              <StatusesButton
                  statuses = { statuses }
                  statuseStudents = {this.statuseStudents}
                  filteredStudents = {this.filteredStudents}
              />
            </div>
            <div className="col-10 row container border border-primary">
              <StudentsList
                  allStudents={ showStudentsArr }
                  withStatusStudents={withStatusStudents}
                  withCourcesStudents={withCourcesStudents}
                  filteredStudents = { this.filteredStudents }
                  repeatFiltering = {this.repeatFiltering}
              />
            </div>
          </div>
        </div> )
  }
}
export default Main;

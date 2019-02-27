import React from "react";
import FireManager from "../../firebase/FireManager";
import CourcesButton from "./courcesButtonGroup"
import StatusesButton from "./statusesButtonGroup"
import StudentsList from "../students/studentsList";

class Main extends React.Component {
  state = {
    students: [],
    getStudentsError: "",
    statuses: [],
    cources: []
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

  studentList =  () => {
    this.state.students.map(student => (
        <div key={student.id}>{student.name}</div>
    ))
  }


  render() {

    const { students, statuses, cources } = this.state;
    return (

        <div className="container border border-primary">
          <div className="row">
            <div className="col-12 border border-primary">
                <CourcesButton cources = { cources }/>
            </div>
          </div>
          <div className="row">
            <div className="col-2 border border-primary">
                <StatusesButton statuses = { statuses }/>
            </div>
            <div className="col-10 row container border border-primary">
                <StudentsList students={ students }/>
            </div>
          </div>
        </div> )
  }
}

export default Main;

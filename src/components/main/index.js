import React from "react";
import FireManager from "../../firebase/FireManager";
import StudentsList from "../students/studentsList";
import AllCources from "./allCources";
import AllStatuses from "./allStatuses";

class Main extends React.Component {
  state = {
    students: [],
    withStatusStudents: [],
    studentsStatus: [],
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

  //show students with selected status
  statuseStudents = statuse => {
    const withStatusStudents = [];
    this.state.students.find(student => {
      if (statuse.id === student.status) {
        withStatusStudents.push(student);
        this.setState({ withStatusStudents: withStatusStudents });
      } else {
        return false;
      }
    });
  };

  render() {
    const { statuses, cources, students, withStatusStudents } = this.state;
    return (
      <div>
        <AllCources cources={cources} />
        <AllStatuses
          checkSubmit={this.state.checkSubmit}
          statuses={statuses}
          students={students}
          statuseStudents={this.statuseStudents}
        />

        <StudentsList
          allStudents={students}
          withStatusStudents={withStatusStudents}
        />
      </div>
    );
  }
}

export default Main;

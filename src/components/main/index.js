import React from "react";
import FireManager from "../../firebase/FireManager";
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

    // FireManager.getStatuses()
    //   .then(querySnapshot => {
    //     this.setState({ statuses: querySnapshot.docs.map(doc => doc.data()) });
    //   })
    //   .catch(err => {
    //     this.setState({ getStudentsError: err.message });
    //   });
  }

  render() {
    const { statuses, cources, students } = this.state;
    return (
      <>
        {/* <div>Cources</div>
        {cources.map(cource => (
          <div>{cource.name}</div>
        ))} */}
        {/* <div>Statuses</div>
        {statuses.map(status => (
          <div>{status.name}</div>
        ))} */}
        <StudentsList students={this.state.students} />
        {/* <div>Students</div>
        {students.map(student => (
          <div>{student.name}</div>
        ))} */}
      </>
    );
  }
}

export default Main;

import React, { Component } from "react";
import StudentItem from "./studentItem"

class StudentsList extends Component {
  state = {};
  render() {
    return (
      <>
        {this.props.students.map(student => (
          <div key={student.id}>{student.name}</div>
        ))}
      </>
    );
  }
}

export default StudentsList;

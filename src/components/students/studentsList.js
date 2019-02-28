import React, { useState, useEffect } from "react";

function StudentsList(props) {
  const [showStudents, setShowStudents] = useState(props.allStudents);
  // const [checkSubmit, setCheckSubmit] = useState(true);

  useEffect(() => {
    if (props.withStatusStudents.length) {
      setShowStudents(props.withStatusStudents);
    } else {
      setShowStudents(props.allStudents);
    }
  });

  return (
    <div>
      {showStudents.map(student => (
        <div key={student.id}>{student.fullName}</div>
      ))}
    </div>
  );
}

export default StudentsList;

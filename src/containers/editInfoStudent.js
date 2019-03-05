import React, { useState } from "react";

import FireManager from "../firebase/FireManager";
import EditStudent from "../components/students/editStudent";

export default function EditStudentModal(props) {
  const [fullName, setFullName] = useState(`${props.student.fullName}`);
  const [email, setEmail] = useState(props.student.email);
  const [phone, setPhone] = useState(props.student.phone);

  const handleFullnameInput = e => {
    setFullName(e.target.value);
  };
  const handleEmailInput = e => {
    setEmail(e.target.value);
  };
  const handlePhoneInput = e => {
    setPhone(e.target.value);
  };

  const editStudent = () => {
    console.log("editstudent");
    let editedStudent = props.student;
    editedStudent.fullName = fullName;
    editedStudent.phone = phone;
    editedStudent.email = email;

    FireManager.editStudentInformation(editedStudent)
      .then(() => {
        debugger;
        props.onHide();
      })
      .catch(err => {
        this.setState({ editStudentError: err && err.message });
      });
  };

  return (
    <EditStudent
      fullName={fullName}
      email={email}
      phone={phone}
      handleEmailInput={handleEmailInput}
      handleFullnameInput={handleFullnameInput}
      handlePhoneInput={handlePhoneInput}
      editStudent={editStudent}
      onHide={props.onHide}
      modalProps={props}
    />
  );
}

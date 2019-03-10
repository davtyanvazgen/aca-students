import React, { useState } from "react";
import { withFirestore } from "react-redux-firebase";
import EditStudent from "../components/students/editStudent";

function EditStudentModal(props) {
  const [fullName, setFullName] = useState(`${props.student.fullName}`);
  const [email, setEmail] = useState(props.student.email);
  const [phone, setPhone] = useState(props.student.phone);

  const handleFullnameInput = e => {
    setFullName(e.target.value.toUpperCase());
  };
  const handleEmailInput = e => {
    setEmail(e.target.value);
  };
  const handlePhoneInput = e => {
    setPhone(e.target.value);
  };

  const editStudent = () => {
    props.firestore
      .collection("students")
      .doc(props.student.id)
      .update({
        fullName,
        phone,
        email
      });

    props.onHide();
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
      show={props.show}
    />
  );
}

export default withFirestore(EditStudentModal);

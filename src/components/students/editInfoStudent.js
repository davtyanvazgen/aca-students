import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Input } from "reactstrap";
import FireManager from "../../firebase/FireManager";

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
    let editedStudent = props.student;
    editedStudent.fullName = fullName;
    editedStudent.phone = phone;
    editedStudent.email = email;

    FireManager.editStudentInformation(editedStudent)
      .then(() => {
        props.onHide();
      })
      .catch(err => {
        this.setState({ editStudentError: err && err.message });
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Edit Fullname</h5>
        <Input value={fullName} onChange={handleFullnameInput} />
        <br />
        <h5>Edit Email</h5>
        <Input value={email} onChange={handleEmailInput} />
        <br />
        <h5>Edit Phone number</h5>
        <Input value={phone} onChange={handlePhoneInput} />
        <br />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={editStudent}>
          Edit
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

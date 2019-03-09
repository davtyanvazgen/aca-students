import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Input } from "reactstrap";

export default function EditStudent(props) {
  const {
    fullName,
    handleFullnameInput,
    email,
    handleEmailInput,
    handlePhoneInput,
    phone,
    editStudent,
    onHide,
    show
  } = props;
  return (
    <Modal
      onHide={onHide}
      show={show}
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
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

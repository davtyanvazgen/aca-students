import React from 'react';
import { Button, Modal } from "react-bootstrap";
import { Input } from "reactstrap";

export default function EditStudent(props) {
    return (
        <Modal
      {...props.modalProps}
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
        <Input value={props.fullName} onChange={props.handleFullnameInput} />
        <br />
        <h5>Edit Email</h5>
        <Input value={props.email} onChange={props.handleEmailInput} />
        <br />
        <h5>Edit Phone number</h5>
        <Input value={props.phone} onChange={props.handlePhoneInput} />
        <br />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={props.editStudent}>
          Edit
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Input, Form, FormGroup } from "reactstrap";
import { withFirestore } from "react-redux-firebase";

const EditStatusModal = props => {
  const [newName, setNewName] = useState(props.status.name);
  const [newLongName, setNewLongName] = useState(props.status.longName);

  const handleEditStatusName = e => {
    setNewName(e.target.value);
  };

  const handleEditStatusLongName = e => {
    setNewLongName(e.target.value);
  };

  const confirmEditStatus = newName => {
    if (newName.trim()) {
      const editStatus = {
        name: newName,
        longName: newLongName.trim(),
        id: status.id
      };

      props.firestore
        .collection("statuses")
        .doc(status.id)
        .update({ ...editStatus })
        .catch(err => {
          alert(err.message);
        });

      props.students.forEach(student => {
        if (student.status === status.id) {
          props.firestore
            .collection("students")
            .doc(student.id)
            .update({ statusName: newLongName.trim() })
            .catch(err => {
              alert(err.message);
            });
        }
      });
    }
  };

  const { status, onHide, show } = props;
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
          ZVART Jan let's edit status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup>
            <h5>Short Name</h5>
            <Input
              bssize="sm"
              value={newName}
              onChange={handleEditStatusName}
            />
            <br />
            <h5>Long Name</h5>
            <Input
              bssize="sm"
              value={newLongName}
              onChange={handleEditStatusLongName}
            />
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button
          variant="warning"
          onClick={() => {
            confirmEditStatus(newName);
            onHide();
          }}
        >
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default withFirestore(EditStatusModal);

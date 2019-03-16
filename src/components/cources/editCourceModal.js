import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Input, Form, FormGroup } from "reactstrap";
import { withFirestore } from "react-redux-firebase";

const EditCourceModal = props => {
  const [newName, setNewName] = useState(props.cource.name);
  const [newLongName, setNewLongName] = useState(props.cource.longName);
  const [editCourceError, setEditCourceError] = useState("");

  const handleEditCourceName = e => {
    setNewName(e.target.value);
  };

  const handleEditCourceLongName = e => {
    setNewLongName(e.target.value);
  };

  const confirmEditCource = newName => {
    if (newName.trim()) {
      const editCource = {
        name: newName,
        longName: newLongName.trim(),
        id: cource.id
      };

      props.firestore
        .collection("cources")
        .doc(cource.id)
        .update({ ...editCource })
        .catch(err => {
          setEditCourceError(err);
        });

      props.students.forEach(student => {
        if (student.cource === cource.id) {
          props.firestore
            .collection("students")
            .doc(student.id)
            .update({ courceName: newLongName.trim() });
        }
      });
    }
  };

  const { cource, onHide, show } = props;
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
          ZVART Jan let's edit course
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup>
            <h5>Short Name</h5>
            <Input
              bssize="sm"
              value={newName}
              onChange={handleEditCourceName}
            />
            <br />
            <h5>Long Name</h5>
            <Input
              bssize="sm"
              value={newLongName}
              onChange={handleEditCourceLongName}
            />
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          onClick={() => {
            confirmEditCource(newName);
            onHide();
          }}
        >
          Edit
        </Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default withFirestore(EditCourceModal);

import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Input, Form, FormGroup } from "reactstrap";
import { withFirestore } from "react-redux-firebase";

const EditCourseModal = props => {
  const [newName, setNewName] = useState(props.course.name);
  const [newLongName, setNewLongName] = useState(props.course.longName);
  const [editCourseError, setEditCourseError] = useState("");

  const handleEditCourseName = e => {
    setNewName(e.target.value);
  };

  const handleEditCourseLongName = e => {
    setNewLongName(e.target.value);
  };

  const confirmEditCourse = newName => {
    if (newName.trim()) {
      const editCourse = {
        name: newName,
        longName: newLongName.trim(),
        id: course.id
      };

      props.firestore
        .collection("courses")
        .doc(course.id)
        .update({ ...editCourse })
        .catch(err => {
          setEditCourseError(err);
        });

      props.students.forEach(student => {
        if (student.course === course.id) {
          props.firestore
            .collection("students")
            .doc(student.id)
            .update({ courseName: newLongName.trim() });
        }
      });
    }
  };

  const { course, onHide, show } = props;
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
              onChange={handleEditCourseName}
            />
            <br />
            <h5>Long Name</h5>
            <Input
              bssize="sm"
              value={newLongName}
              onChange={handleEditCourseLongName}
            />
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          onClick={() => {
            confirmEditCourse(newName);
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

export default withFirestore(EditCourseModal);

import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export default class DeleteCourseModal extends Component {
  render() {
    const {
      studentsSameCourse,
      course,
      handleRemove,
      onHide,
      show
    } = this.props;

    const body = studentsSameCourse.length ? (
      <>
        <h4>
          There are {studentsSameCourse.length} Students with {course.name}
        </h4>
        <p>
          if you delete this course you will lose {studentsSameCourse.length}
          friends
        </p>
      </>
    ) : (
      <h6>Do you want to delete this course ?</h6>
    );

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
            Are You Sure ZVART jan ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button variant="danger" onClick={handleRemove}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

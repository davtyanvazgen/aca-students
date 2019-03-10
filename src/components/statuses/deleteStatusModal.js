import React from "react";
import { Modal, Button } from "react-bootstrap";

export default class DeleteStatusModal extends React.Component {
  render() {
    const {
      studentsSameStatus,
      statuse,
      handleRemove,
      onHide,
      show
    } = this.props;

    const body = studentsSameStatus.length ? (
      <>
        <h4>
          There are {studentsSameStatus.length} Students with {statuse.name}
        </h4>
        <p>
          if you delete this course you will remove {studentsSameStatus.length}{" "}
          students
        </p>
      </>
    ) : (
      <h6>Do you want to delete this cource ?</h6>
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
            Are You Sure ?
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

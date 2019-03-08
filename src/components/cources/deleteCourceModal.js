import React from "react";
import { Modal, Button } from "react-bootstrap";

export default class DeleteCourceModal extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Are You Sure
          </Modal.Title>
        </Modal.Header>
        {this.props.studentsSameCource.length ? (
          <Modal.Body>
            <h4>
              There are {this.props.studentsSameCource.length} Students with{" "}
              {this.props.cource.name}
            </h4>
            <p>
              if you delete this course you will remove{" "}
              {this.props.studentsSameCource.length} students
            </p>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <h6>Do you want to delete this cource ?</h6>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          <Button variant="danger" onClick={this.props.handleRemove}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

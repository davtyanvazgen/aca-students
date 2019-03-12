import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class DeleteStudentModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modal}
          toggle={this.props.toggleDeleteStudent}
          className={this.props.className}
        >
          <ModalHeader>Are You Sure</ModalHeader>
          <ModalBody>You want to delete {this.props.student}</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.props.handleRemove}>
              Delete
            </Button>
            <Button color="secondary" onClick={this.props.toggleDeleteStudent}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeleteStudentModal;

import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class DeleteStudentModal extends React.Component {
  render() {
    const { modal, toggleDeleteStudent, student, handleRemove } = this.props;
    return (
      <div>
        <Modal
          isOpen={modal}
          toggle={toggleDeleteStudent}
          className="studentModal"
        >
          <ModalHeader>Are You Sure</ModalHeader>
          <ModalBody>
            You want to delete <b>{student}</b>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleRemove}>
              Delete
            </Button>
            <Button color="secondary" onClick={toggleDeleteStudent}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeleteStudentModal;

import React from "react";
import "../../styles/authentication.css";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import edna from "../../../images/edna.png";

const Success = props => {
  return (
    <div>
      <Modal isOpen={props.open} id="regModal">
        <ModalBody>
          <>
            <img id="regModalBody" src={edna} />
          </>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggleSuccess}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Success;

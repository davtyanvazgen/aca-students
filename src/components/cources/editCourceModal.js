import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Input, Label, Form, FormGroup } from "reactstrap";
import { withFirestore } from "react-redux-firebase";

function EditCourceModal(props) {
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
                    <span style={{ color: "green" }}> ZVART Jan </span> let's edit course
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <Label>Long Name</Label>
                        <Input
                            bssize="sm"
                            value={newName}
                            onChange={handleEditCourceName}
                        />
                        <br />
                        <Label>Short Name</Label>
                        <Input
                            bssize="sm"
                            value={newLongName}
                            onChange={handleEditCourceLongName}
                        />
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                <Button
                    variant="warning"
                    onClick={() => {
                        confirmEditCource(newName);
                        onHide();
                    }}
                >
                    Edit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default withFirestore(EditCourceModal);
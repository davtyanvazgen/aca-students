import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Input, Label, Form, FormGroup } from "reactstrap";
import { withFirestore } from "react-redux-firebase";

const EditStatuseModal = props => {
    const [newName, setNewName] = useState(props.statuse.name);
    const [newLongName, setNewLongName] = useState(props.statuse.longName);
    const [editStatuseError, setEditStatuseError] = useState("");

    const handleEditStatuseName = e => {
        setNewName(e.target.value);
    };

    const handleEditStatuseLongName = e => {
        setNewLongName(e.target.value);
    };

    const confirmEditStatuse = newName => {
        if (newName.trim()) {
            const editStatuse = {
                name: newName,
                longName: newLongName.trim(),
                id: statuse.id
            };

            props.firestore
                .collection("statuses")
                .doc(statuse.id)
                .update({ ...editStatuse })
                .catch(err => {
                    setEditStatuseError(err);
                });

            props.students.forEach(student => {
                if (student.status === statuse.id) {
                    props.firestore
                        .collection("students")
                        .doc(student.id)
                        .update({ statusName: newLongName.trim() });
                }
            });
        }
    };

    const { statuse, onHide, show } = props;
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
                    <span style={{ color: "green" }}> ZVART Jan </span> let's edit status
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <h5>Short Name</h5>
                        <Input
                            bssize="sm"
                            value={newName}
                            onChange={handleEditStatuseName}
                        />
                        <br />
                        <h5>Long Name</h5>
                        <Input
                            bssize="sm"
                            value={newLongName}
                            onChange={handleEditStatuseLongName}
                        />
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                <Button
                    variant="warning"
                    onClick={() => {
                        confirmEditStatuse(newName);
                        onHide();
                    }}
                >
                    Edit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default withFirestore(EditStatuseModal);

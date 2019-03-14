import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export default class DeleteCourceModal extends Component {
    render() {
        const {
            studentsSameCource,
            cource,
            handleRemove,
            onHide,
            show
        } = this.props;

        const body = studentsSameCource.length ? (
            <>
                <h4>
                    There are{" "}
                    <span style={{ color: "blue" }}>{studentsSameCource.length}</span>{" "}
                    Students with <span style={{ color: "blue" }}>{cource.name}</span>
                </h4>
                <p>
                    if you delete this course you will lose
                    <span style={{ color: "blue" }}> {studentsSameCource.length}</span>
                    friends
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
                        Are You Sure <span style={{ color: "green" }}>ZVART jan</span>
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
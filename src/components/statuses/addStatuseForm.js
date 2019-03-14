import React, { useState } from "react";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    ButtonGroup,
    Col,
    Container,
    Row
} from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import { v1 } from "uuid";
import Picker from "./picker";

const AddStatuseForm = ({ firestore }) => {
    const [name, setName] = useState("");
    const [longName, setLongName] = useState("");
    const [addStatusError, setAddStatusError] = useState("");
    const [background, setBackground] = useState("#23B98C");

    function handleChangeComplete(color) {
        setBackground(color.hex);
        console.log(color.hex, typeof color.hex);
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeLongName(e) {
        setLongName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name.trim()) {
            const newStatuse = {
                id: v1(),
                longName: longName.trim(),
                name,
                color: background
            };

            firestore
                .collection("statuses")
                .doc(newStatuse.id)
                .set(newStatuse)
                .catch(err => {
                    setAddStatusError(err);
                });

            setName("");
            setLongName("");
        }
    }

    return (
        <>
            <Col>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Status`s short name</Label>
                        <Input
                            type="text"
                            placeholder="Enter short name of status"
                            value={name}
                            onChange={handleChangeName}
                        />
                        <Label>Status`s short long name</Label>
                        <Input
                            type="text"
                            placeholder="Enter long name of status"
                            value={longName}
                            onChange={handleChangeLongName}
                        />
                    </FormGroup>

                    <Button type="submit" color="success" block>
                        Add
                    </Button>
                </Form>
            </Col>
            <Col>
                <Container style={{ border: "1px solid " }}>
                    <Row>
                        <Picker
                            handleChangeComplete={handleChangeComplete}
                            name={name}
                            longName={longName}
                            background={background}
                        />
                    </Row>
                </Container>
            </Col>
        </>
    );
};

export default withFirestore(AddStatuseForm);
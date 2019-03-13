import React, { useState } from "react";
import {Button, Form, FormGroup, Label, Input, ButtonGroup, Col, Container, Row} from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import { v1 } from "uuid";

const AddStatuseForm = ({ firestore }) => {
  const [name, setName] = useState("");
  const [longName, setLongName] = useState("");
  const [addStatusError, setAddStatusError] = useState("");
  const [rSelected, setSelected] = useState("");

  function onRadioBtnClick(select) {
    setSelected(select);
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
          color: rSelected,
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
                <ButtonGroup>
                   <Button className="registrationColor" onClick={() => onRadioBtnClick("registrationColor")} active={rSelected === "registrationColor"}>Registr</Button>
                    <Button className="examColor" onClick={() => onRadioBtnClick("examColor")} active={rSelected === "examColor"}>Exam</Button>
                    <Button className="interviewColor" onClick={() => onRadioBtnClick("interviewColor")} active={rSelected === "interviewColor"}>Interview</Button>
                    <Button className="trainingColor" onClick={() => onRadioBtnClick("trainingColor")} active={rSelected === "trainingColor"}>Training</Button>
                </ButtonGroup>
                <Button type="submit" color="success" block>
                    Add
                </Button>
            </Form>
        </Col>
        <Col>
           <Container style={{border: "1px solid "}}>
               <Row>
                   <Button className={rSelected}>{name}</Button>
               </Row>
               <Row>
                   <Button className={rSelected}>{longName}</Button>
               </Row>
           </Container>
        </Col>
    </>
  );
};

export default withFirestore(AddStatuseForm);

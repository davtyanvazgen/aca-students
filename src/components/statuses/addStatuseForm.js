import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import { v1 } from "uuid";
import Color from "./colors";

const AddStatuseForm = ({ firestore }) => {
  const [name, setName] = useState("");
  const [longName, setLongName] = useState("");
  const [addStatusError, setAddStatusError] = useState("");

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
        name
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
      <Color />
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
    </>
  );
};

export default withFirestore(AddStatuseForm);

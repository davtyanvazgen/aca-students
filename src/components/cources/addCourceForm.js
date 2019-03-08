import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import { v1 } from "uuid";

const AddCourceForm = ({ firestore }) => {
  const [name, setName] = useState("");
  const [longName, setLongName] = useState("");
  const [addCourceError, setAddCourceError] = useState("");

  const handleChangeName = e => {
    setName(e.target.value);
  };
  function handleChangeLongName(e) {
    setLongName(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim()) {
      const newCource = {
        id: v1(),
        longName: longName.trim(),
        name
      };

      firestore
        .collection("cources")
        .doc(newCource.id)
        .set(newCource)
        .catch(err => {
          setAddCourceError(err);
        });

      setName("");
      setLongName("");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Cource`s short name</Label>
          <Input
            type="text"
            placeholder="Enter new cource"
            value={name}
            onChange={handleChangeName}
          />
          <Label>Cource`s long name</Label>
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

export default withFirestore(AddCourceForm);

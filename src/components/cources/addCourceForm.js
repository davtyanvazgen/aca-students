import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import { v1 } from "uuid";

const AddCourceForm = ({ firestore }) => {
  const [name, setName] = useState("");
  const [addCourceError, setAddCourceError] = useState("");

  const handleChange = e => {
    setName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim()) {
      const newCource = {
        id: v1(),
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
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Add new cource</Label>
          <Input
            type="text"
            placeholder="Enter new cource"
            value={name}
            onChange={handleChange}
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

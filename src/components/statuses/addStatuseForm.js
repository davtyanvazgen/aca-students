import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import { v1 } from "uuid";

const AddStatuseForm = ({ firestore }) => {
  const [name, setName] = useState("");
  const [addStatusError, setAddStatusError] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim()) {
      const newStatuse = {
        id: v1(),
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
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Add new statuse</Label>
          <Input
            type="text"
            placeholder="Enter new status"
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

export default withFirestore(AddStatuseForm);

import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import { v1 } from "uuid";

const AddStatuseForm = ({ firestore }) => {
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newStatuse = {
      id: v1(),
      name
    };

    if (!newStatuse.name.trim()) {
      setName("");
      return;
    }

    firestore
      .collection("statuses")
      .doc(newStatuse.id)
      .set(newStatuse)
      .catch(err => {
        setErr(err.message);
      });

    setName("");
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

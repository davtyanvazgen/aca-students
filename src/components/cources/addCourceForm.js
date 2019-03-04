import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withFirestore } from 'react-redux-firebase'
import { v1 } from "uuid"


function AddForm({ firestore }) {
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  function handleChange(e) {
    setName(e.target.value);
  }
  function handleSubmit(e){
    e.preventDefault();

    const newCource = {
      id: v1(),
      name
    }

    firestore.collection("cources")
        .doc(newCource.id)
        .set(newCource).then( () => {  setName("") } ).catch( (err) => {setErr(err.message)} );

  }

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
}


export default withFirestore(AddForm)

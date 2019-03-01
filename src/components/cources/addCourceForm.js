import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";



export default function AddForm(props) {

  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <>
      <Form onSubmit={(e) => props.addNewCource(e, value)}>
        <FormGroup>
          <Label>Add new cource</Label>
          <Input
            type="text"
            placeholder="Enter new cource"
            value={value}
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

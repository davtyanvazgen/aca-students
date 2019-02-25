import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function AddForm(props) {
  return (
    <>
      <Form>
        <FormGroup>
          <Label>Add new cource</Label>
          <Input
            type="text"
            value={props.value}
            onChange={props.handleChange}
          />
        </FormGroup>
        <Button color="success" block onClick={props.addNewCource}>
          Add
        </Button>
      </Form>
    </>
  );
}

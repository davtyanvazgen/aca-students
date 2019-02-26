import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function AddForm(props) {
  return (
    <>
      <Form onSubmit={props.addNewCource}>
        <FormGroup>
          <Label>Add new cource</Label>
          <Input
            type="text"
            placeholder="Enter new cource"
            value={props.value}
            onChange={props.handleChange}
          />
        </FormGroup>
        <Button type="submit" color="success" block>
          Add
        </Button>
      </Form>
    </>
  );
}

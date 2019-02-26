import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function AddStatusForm(props) {
  return (
    <>
      <Form onSubmit={props.addNewStatuse}>
        <FormGroup>
          <Label>Add new statuse</Label>
          <Input
            type="text"
            placeholder="Enter new status"
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

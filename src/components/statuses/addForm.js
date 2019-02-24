import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function AddStatusForm(props) {
  return (
    <div className="miniContainer">
      <Form>
        <FormGroup>
          <Label for="examplePassword">Add new statuse</Label>
          <Input
            type="text"
            value={props.value}
            onChange={props.handleChange}
          />
        </FormGroup>
        <Button color="success" block onClick={props.addNewStatuse}>
          Add
        </Button>
      </Form>
    </div>
  );
}

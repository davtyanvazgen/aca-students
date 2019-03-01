import React, {useState} from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function AddStatusForm(props) {

  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <>
      <Form onSubmit={(e) => props.addNewStatuse(e, value)}>
        <FormGroup>
          <Label>Add new statuse</Label>
          <Input
            type="text"
            placeholder="Enter new status"
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

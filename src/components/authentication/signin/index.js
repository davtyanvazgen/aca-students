import React from "react";
import "../styles/style.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function SignIn() {
  return (
    <div id="container">
      <div className="miniContainer">
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email address</Label>
            <Input
              type="email"
              name="email"
              // id="exampleEmail"
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              // id="examplePassword"
              placeholder="Password"
            />
          </FormGroup>
          <Button color="success" block>
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
}

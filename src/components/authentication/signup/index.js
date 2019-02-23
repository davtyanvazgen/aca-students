import React from "react";
import "../styles/style.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function Signup(props) {
  return (
    <>
      <div id="container">
        <div className="miniContainer">
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="firstName"
                // id="exampleEmail"
                placeholder="Firstname"
              />
            </FormGroup>

            <FormGroup>
              <Label>Surname</Label>
              <Input
                type="text"
                name="surName"
                // id="exampleEmail"
                placeholder="Surname"
              />
            </FormGroup>

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
              Sign up
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

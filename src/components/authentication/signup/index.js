import React from "react";
// import "./styles.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function Signup(props) {
  return (
    <>
      <div
        className="container"
        style={{
          width: "350px",
          margin: "80px auto",
          border: "1px solid grey",
          borderRadius: "5px ",
          backgroundColor: "#F4F4F4"
        }}
      >
        <div
          className="miniContainer"
          style={{ width: "300px", margin: "20px auto" }}
        >
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

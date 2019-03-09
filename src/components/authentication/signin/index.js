import React, { useState } from "react";
import "../styles/style.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import FireManager from "../../../firebase/FireManager";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import {connect} from "react-redux";
import { compose } from "redux";


function SignIn({ firebase, auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log( auth, isLoaded(auth), isEmpty(auth));
  const adminLogIn = function() {
    if (email && password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => { window.location = "/"; })
        .catch((err) => { alert(err.message) });
    } else {
      alert("please enter correct email or password");
    }
  };


  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };

  return (
    <div id="container">
      <div className="miniContainer">
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email address</Label>
            <Input
              value={email}
              type="email"
              name="email"
              onChange={handleEmail}
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              value={password}
              type="password"
              name="password"
              onChange={handlePassword}
              placeholder="Password"
            />
          </FormGroup>
          <Button color="success" block onClick={adminLogIn}>
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default compose(
    firebaseConnect(), // withFirebase can also be used
    connect(({ firebase: { auth } }) => ({ auth }))
)(SignIn)

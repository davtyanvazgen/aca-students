import React, { useState } from "react";
import "../styles/style.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { v1 } from "uuid";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

function RegistrationForm(props) {
  const name = useFormInput("");
  const surname = useFormInput("");
  const phone = useFormInput("");
  const email = useFormInput("");
  const [selectedCource, setCource] = useState("");
  const [nameValidationError, setNameValidationError] = useState("");
  const [surNameValidationErrors, setSurNameValidationErrors] = useState("");
  const [emailValidationErrors, setEmailValidationErrors] = useState("");
  const [phoneValidationErrors, setPhoneValidationErrors] = useState("");

  function handleChooseCource(e, cource) {
    e.preventDefault();
    setCource(cource);
  }

  function handeleCreateStudent() {
    const checkValidForm = validation();
    const id = v1();

    const date = new Date();
    const registerDate = `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()}`;

    if (checkValidForm) {
      const defaultStatus = props.statuses.find(el => el.name === "apply");
      let student = {
        fullName: name.value + " " + surname.value,
        phone: phone.value,
        email: email.value,
        status: defaultStatus.id,
        statusName: defaultStatus.name,
        courceName: selectedCource.name,
        cource: selectedCource.id,
        id: id,
        date: registerDate
      };

      props.firestore
        .collection("students")
        .doc(student.id)
        .set(student);
    } else {
      return false;
    }
  }

  function validation() {
    const validator = require("validator");
    const nameErrors = validator.isAlpha(name.value);
    !nameErrors
      ? setNameValidationError("Have to be letters")
      : setNameValidationError("");
    const surNameErrors = validator.isAlpha(surname.value);
    !surNameErrors
      ? setSurNameValidationErrors("Have to be letters")
      : setSurNameValidationErrors("");
    const emailErrors = validator.isEmail(email.value);
    !emailErrors
      ? setEmailValidationErrors("Wrong email")
      : setEmailValidationErrors("");
    const phoneErrors =
      validator.isInt(phone.value) &&
      validator.isLength(phone.value, { min: 8, max: 13 });
    !phoneErrors
      ? setPhoneValidationErrors("Wrong number")
      : setPhoneValidationErrors("");
    if (nameErrors && surNameErrors && emailErrors && phoneErrors) {
      return true;
    }
    return false;
  }

  return (
    <>
      <div id="container">
        <div className="miniContainer">
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input {...name} type="text" name="name" />
              {nameValidationError && (
                <p style={{ color: "red" }}>{nameValidationError}</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Surname</Label>
              <Input {...surname} type="text" name="surname" />
              {surNameValidationErrors && (
                <p style={{ color: "red" }}>{surNameValidationErrors}</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Email address</Label>
              <Input {...email} type="email" name="email" />
              {emailValidationErrors && (
                <p style={{ color: "red" }}>{emailValidationErrors}</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Phone</Label>
              <Input
                {...phone}
                placeholder="+374-00-00-00-00"
                type="text"
                name="phone"
              />
              {phoneValidationErrors && (
                <p style={{ color: "red" }}>{phoneValidationErrors}</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Select lesson</Label>
              <br />
              {props.cources &&
                props.cources.map(cource => (
                  <button
                    key={cource.id}
                    value={cource}
                    onClick={e => {
                      handleChooseCource(e, cource);
                    }}
                  >
                    {cource.name}
                  </button>
                ))}
            </FormGroup>
            <Button color="success" block onClick={handeleCreateStudent}>
              Registration
            </Button>
          </Form>
        </div>
      </div>
    </>
  );

  function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    function handlechange(e) {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handlechange
    };
  }
}

export default compose(
  firestoreConnect(() => ["statuses", "cources"]), // or { collection: 'todos' }
  connect((state, props) => ({
    statuses: state.firestore.ordered.statuses,
    cources: state.firestore.ordered.cources
  }))
)(RegistrationForm);

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
  const [selectedCourceId, setSelectedCourceId] = useState("");
  const [selectedCource, setSelectedCource] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [nameValidationError, setNameValidationError] = useState("");
  const [surNameValidationErrors, setSurNameValidationErrors] = useState("");
  const [emailValidationErrors, setEmailValidationErrors] = useState("");
  const [phoneValidationErrors, setPhoneValidationErrors] = useState("");
  const [knowledgeValidationErrors, setKnowledgeValidationErrors] = useState("");
  const [selectCourceValidationErrors, setSelectCourceValidationErrors] = useState("");

  function hanldeSelectKnowledge(e) {
    setKnowledge(e.target.value);
  }

  function hanldeSelectLesson(e) {
    let cource = JSON.parse(e.target.value);
    setSelectedCource(cource.longName);
    setSelectedCourceId(cource.id);
  }

  function handeleCreateStudent() {
    const id = v1();
    const date = new Date();
    if (validation()) {
      const defaultStatus = props.statuses.find(el => el.id === "fc4a5a70-4739-11e9-8e2b-71e4e6f455b5");
      let student = {
        fullName: name.value.toUpperCase() + " " + surname.value.toUpperCase(),
        phone: phone.value,
        email: email.value,
        status: defaultStatus.id,
        statusName: defaultStatus.longName,
        courceName: selectedCource,
        cource: selectedCourceId,
        id: id,
        date: date,
        knowledge,
        comment: ""
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

    let knowledgeErrors;
    if (!knowledge) {
      setKnowledgeValidationErrors("choose your level ");
      knowledgeErrors = false;
    } else {
      setKnowledgeValidationErrors("");
      knowledgeErrors = true;
    }

    let courceErrors;
    if (!selectedCource) {
      setSelectCourceValidationErrors("choose Lesson");
      courceErrors = false;
    } else {
      setSelectCourceValidationErrors("");
      courceErrors = true;
    }

    if (
      nameErrors &&
      surNameErrors &&
      emailErrors &&
      phoneErrors &&
      knowledgeErrors &&
      courceErrors
    ) {
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
              <Label>Select Lesson</Label>
              <Input
                type="select"
                name="select"
                id="select"
                defaultValue={1}
                onChange={hanldeSelectLesson}
              >
                <option value={1} disabled>
                  --choose Lesson--
                </option>
                {props.cources &&
                  props.cources.map(cource => (
                    <option key={cource.id} value={JSON.stringify(cource)}>
                      {cource.longName}
                    </option>
                  ))}
              </Input>

              {selectCourceValidationErrors && (
                <p style={{ color: "red" }}>{selectCourceValidationErrors}</p>
              )}
            </FormGroup>

            <FormGroup>
              <Label>It knowledge Level</Label>
              <Input
                defaultValue={1}
                type="select"
                name="select"
                id="select"
                onChange={hanldeSelectKnowledge}
              >
                <option value={1} disabled>
                  --choose--
                </option>
                <option>Beginner</option>
                <option>Know basics some programming language</option>
                <option>Know enough some programming language</option>
                <option>
                  Good at some programming language and have experience
                </option>
                option>
              </Input>
              {knowledgeValidationErrors && (
                <p style={{ color: "red" }}>{knowledgeValidationErrors}</p>
              )}
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
  firestoreConnect(() => ["statuses", "cources"]),
  connect((state, props) => ({
    statuses: state.firestore.ordered.statuses,
    cources: state.firestore.ordered.cources
  }))
)(RegistrationForm);

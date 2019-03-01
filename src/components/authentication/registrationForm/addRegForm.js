import React, { useState } from "react";
import "../styles/style.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import SelectForm from "./select";
import FireManager from "../../../firebase/FireManager";
import { v1 } from "uuid";
import { Link } from "react-router-dom";

export default function RegistrationForm(props) {
    const name = useFormInput("");
    const surname = useFormInput("");
    const phone = useFormInput("");
    const email = useFormInput("");
    const selectedCource = props.selectValue;
    const allStatuses = props.allStatuses;

    const [nameValidationError, setNameValidationError] = useState("");
    const [surNameValidationErrors, setSurNameValidationErrors] = useState("");
    const [emailValidationErrors, setEmailValidationErrors] = useState("");
    const [phoneValidationErrors, setPhoneValidationErrors] = useState("");

    function handeleCreateStudent() {
        const checkValidForm = validation();
        if (checkValidForm) {
            const defaultStatus = allStatuses.find(el => el.name === "apply");
            let student = {
                fullName: name.value + " " + surname.value,
                phone: phone.value,
                email: email.value,
                status: defaultStatus.id,
                statusName: defaultStatus.name,
                courceName: selectedCource.name,
                cource: selectedCource.id,
                id: v1()
            };

            FireManager.addStudent(student)
                .then(() => {
                    alert("done!");
                })
                .catch(err => {
                    console.log(err.message);
                });
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
                            <SelectForm
                                changeSelectValue={props.changeSelectValue}
                                selectValue={props.selectValue}
                                changeAllStatuses={props.changeAllStatuses}
                                allStatuses={props.allStatuses}
                            />
                        </FormGroup>

                        {/* <Link to="/"> */}
                        <Button color="success" block onClick={handeleCreateStudent}>
                            Registration
                        </Button>
                        {/* </Link> */}
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
import React, {useState} from "react";
import "../styles/style.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import SelectForm from './select';
import FireManager from "../../../firebase/FireManager";
import { v1 } from "uuid";

export default function RegistrationForm(props) {
 const name = useFormInput('');
 const surname = useFormInput('');
 const phone = useFormInput('');
 const email = useFormInput('');
 const selectedCource = props.selectValue;

  function handeleCreateStudent() {
   let student = {
     name:name.value,
     surname:surname.value,
     phone:phone.value,
     email:email.value,
     statusId: 1111,
     courceId:selectedCource.id,
     id:v1()
   }
   console.log(student);
   FireManager.addStudent(student);
 }
  return (
    <>
      <div id="container">
        <div className="miniContainer">
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input
                {...name}
                type="text"
                name="firstName"
              />
            </FormGroup>

            <FormGroup>
              <Label>Surname</Label>
              <Input
                {...surname}
                type="text"
                name="surName"
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleEmail">Email address</Label>
              <Input
                {...email}
                type="email"
                name="email"
              />
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword">Phone</Label>
              <Input
                {...phone}
                placeholder = "+374-00-00-00-00"
                type="text"
                name="phone"
              />
            </FormGroup>

            <FormGroup>
              <Label>Select lesson</Label><br/>
              <SelectForm changeSelectValue = {props.changeSelectValue}  selectValue = {props.selectValue} changeAllCources = {props.changeAllCources} allCources = {props.allCources}/>
            </FormGroup>

            <Button color="success" block onClick = {handeleCreateStudent}>
              Registration
            </Button>
          </Form>
        </div>
      </div>
    </>
  );

  function useFormInput(initialValue){
    const [value,setValue] =useState(initialValue);
    function handlechange(e){
      setValue (e.target.value)
    }
    return{
      value,
      onChange:handlechange
    }
  }
}

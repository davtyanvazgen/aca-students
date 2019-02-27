import React, {useState} from "react";
import "../styles/style.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import SelectForm from './select';
import FireManager from "../../../firebase/FireManager";
import { v1 } from "uuid";

export default function RegistrationForm(props) {

 const fullName = useFormInput('');
 const phone = useFormInput('');
 const email = useFormInput('');
 const selectedCource = props.selectValue;
 const allStatuses = props.allStatuses;

  function handeleCreateStudent() {
    console.log(allStatuses);
   const defaultStatus = allStatuses.find(el =>el.name === "apply");
    console.log(defaultStatus);
   let student = {
        fullName:fullName.value,
         phone:phone.value,
         email:email.value,
           statusName: defaultStatus.name,
           courceName: selectedCource.name,
         status:defaultStatus.id,
         cource:selectedCource.id,
         id:v1()
   }

   console.log("student = ",student);
  
   FireManager.addStudent(student).then(()=>{
    alert("done!");
    
   }

   ).catch(err=>{
     console.log(err.message)
   })
 }
  return (
    <>
      <div id="container">
        <div className="miniContainer">
          <Form>
            <FormGroup>
              <Label>FullName</Label>
              <Input
                {...fullName}
                type="text"
                name="firstName"
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
              <SelectForm 
                changeSelectValue = {props.changeSelectValue} 
                selectValue = {props.selectValue} 
                changeAllStatuses = {props.changeAllStatuses} 
                allStatuses = {props.allStatuses}/>
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

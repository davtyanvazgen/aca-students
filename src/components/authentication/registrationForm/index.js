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
  const [knowledgeValidationErrors, setKnowledgeValidationErrors] = useState(
    ""
  );
  const [
    selectCourceValidationErrors,
    setSelectCourceValidationErrors
  ] = useState("");

  function hanldeSelectKnowledge(e) {
    setKnowledge(e.target.value);
  }

  function hanldeSelectLesson(e) {
    let cource = JSON.parse(e.target.value);
    setSelectedCource(cource.name);
    setSelectedCourceId(cource.id);
  }

  function handeleCreateStudent() {
    const id = v1();

    const date = new Date();
    const registerDate = `(${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()})`;

    if (validation()) {
      const defaultStatus = props.statuses.find(el => el.name === "apply");
      let student = {
        fullName: name.value.toUpperCase() + " " + surname.value.toUpperCase(),
        phone: phone.value,
        email: email.value,
        status: defaultStatus.id,
        statusName: defaultStatus.name,
        courceName: selectedCource,
        cource: selectedCourceId,
        id: id,
        date: registerDate,
        knowledge
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
                      {cource.name}
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

// import React, { useState } from "react";
// import "../styles/style.css";
// import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import { v1 } from "uuid";
// import { compose } from "redux";
// import { firestoreConnect } from "react-redux-firebase";
// import { connect } from "react-redux";
// import { combineReducers } from "redux";

// function RegistrationForm(props) {
//   const name = useFormInput("");
//   const surname = useFormInput("");
//   const phone = useFormInput("");
//   const email = useFormInput("");
//   const [path, setPath] = useState("Can add photo!");
//   const [selectedCourceId, setSelectedCourceId] = useState("");
//   const [selectedCource, setSelectedCource] = useState("");
//   const [knowledge, setKnowledge] = useState("");
//   const [nameValidationError, setNameValidationError] = useState("");
//   const [surNameValidationErrors, setSurNameValidationErrors] = useState("");
//   const [emailValidationErrors, setEmailValidationErrors] = useState("");
//   const [phoneValidationErrors, setPhoneValidationErrors] = useState("");
//   const [knowledgeValidationErrors, setKnowledgeValidationErrors] = useState(
//     ""
//   );
//   const [
//     selectCourceValidationErrors,
//     setSelectCourceValidationErrors
//   ] = useState("");

//   function hanldeSelectKnowledge(e) {
//     setKnowledge(e.target.value);
//   }
//   function handleChangePath(e) {
//     setPath(e.target.value);
//   }

//   function hanldeSelectLesson(e) {
//     let cource = JSON.parse(e.target.value);
//     setSelectedCource(cource.name);
//     setSelectedCourceId(cource.id);
//   }

//   const uploader = () => {
//     const { firebase } = props;
//     const ref = firebase.storage().ref("studentsAvatar");
//     const file = document.querySelector("#inputGroupFile01").files[0];
//     const name = +new Date() + "-" + file.name;
//     const metadata = { contentType: file.type };
//     const task = ref.child(name).put(file, metadata);
//     return task;
//   };

//   function handeleCreateStudent() {
//     const id = v1();
//     debugger;
//     const date = new Date();
//     const registerDate = `(${date.getDate()}/${date.getMonth() +
//       1}/${date.getFullYear()})`;

//     const format = path.slice(path.length - 3).toLowerCase();

//     if (validation()) {
//       const defaultStatus = props.statuses.find(el => el.name === "apply");
//       let student = {
//         fullName: name.value.toUpperCase() + " " + surname.value.toUpperCase(),
//         phone: phone.value,
//         email: email.value,
//         status: defaultStatus.id,
//         statusName: defaultStatus.name,
//         courceName: selectedCource,
//         cource: selectedCourceId,
//         id: id,
//         date: registerDate,
//         knowledge,
//         url:
//           "https://i.pinimg.com/originals/02/f3/87/02f38779c48e8880536a51c309227c8c.gif"
//       };

//       if (
//         format === "png" ||
//         format === "peg" ||
//         format === "gif" ||
//         format === "jpg"
//       ) {
//         uploader(student)
//           .then(snapshot => snapshot.ref.getDownloadURL())
//           .then(url => {
//             student.url = url;
//             props.firestore
//               .collection("students")
//               .doc(student.id)
//               .set(student);
//             alert("Your successfully registered...");
//             return;
//           })
//           .catch(err => console.log(err.message));
//       } else {
//         setPath("Can add photo!");
//       }

//       props.firestore
//         .collection("students")
//         .doc(student.id)
//         .set(student);
//       alert("Your successfully registered...");
//     } else {
//       return false;
//     }
//   }

//   function validation() {
//     const validator = require("validator");
//     const nameErrors = validator.isAlpha(name.value);
//     !nameErrors
//       ? setNameValidationError("Have to be letters")
//       : setNameValidationError("");
//     const surNameErrors = validator.isAlpha(surname.value);
//     !surNameErrors
//       ? setSurNameValidationErrors("Have to be letters")
//       : setSurNameValidationErrors("");
//     const emailErrors = validator.isEmail(email.value);
//     !emailErrors
//       ? setEmailValidationErrors("Wrong email")
//       : setEmailValidationErrors("");
//     const phoneErrors =
//       validator.isInt(phone.value) &&
//       validator.isLength(phone.value, { min: 8, max: 13 });
//     !phoneErrors
//       ? setPhoneValidationErrors("Wrong number")
//       : setPhoneValidationErrors("");

//     let knowledgeErrors;
//     if (!knowledge) {
//       setKnowledgeValidationErrors("choose your level ");
//       knowledgeErrors = false;
//     } else {
//       setKnowledgeValidationErrors("");
//       knowledgeErrors = true;
//     }

//     let courceErrors;
//     if (!selectedCource) {
//       setSelectCourceValidationErrors("choose Lesson");
//       courceErrors = false;
//     } else {
//       setSelectCourceValidationErrors("");
//       courceErrors = true;
//     }

//     if (
//       nameErrors &&
//       surNameErrors &&
//       emailErrors &&
//       phoneErrors &&
//       knowledgeErrors &&
//       courceErrors
//     ) {
//       return true;
//     }

//     return false;
//   }

//   return (
//     <>
//       <div id="container">
//         <div className="miniContainer">
//           <Form className="formRegistration">
//             <FormGroup>
//               <Label>Name</Label>
//               <Input {...name} type="text" name="name" className="inpRegForm" />
//               {nameValidationError && (
//                 <p style={{ color: "red" }}>{nameValidationError}</p>
//               )}
//             </FormGroup>
//             <FormGroup>
//               <Label>Surname</Label>
//               <Input
//                 {...surname}
//                 type="text"
//                 name="surname"
//                 className="inpRegForm"
//               />
//               {surNameValidationErrors && (
//                 <p style={{ color: "red" }}>{surNameValidationErrors}</p>
//               )}
//             </FormGroup>
//             <FormGroup>
//               <Label for="exampleEmail">Email address</Label>
//               <Input
//                 {...email}
//                 type="email"
//                 name="email"
//                 className="inpRegForm"
//               />
//               {emailValidationErrors && (
//                 <p style={{ color: "red" }}>{emailValidationErrors}</p>
//               )}
//             </FormGroup>
//             <FormGroup>
//               <Label for="examplePassword">Phone</Label>
//               <Input
//                 {...phone}
//                 placeholder="+374-00-00-00-00"
//                 type="text"
//                 name="phone"
//                 className="inpRegForm"
//               />
//               {phoneValidationErrors && (
//                 <p style={{ color: "red" }}>{phoneValidationErrors}</p>
//               )}
//             </FormGroup>

//             <FormGroup>
//               <Label>Select Lesson</Label>
//               <Input
//                 type="select"
//                 name="select"
//                 id="select"
//                 defaultValue={1}
//                 onChange={hanldeSelectLesson}
//                 className="selectRegForm"
//               >
//                 <option value={1} disabled>
//                   --choose Lesson--
//                 </option>
//                 {props.cources &&
//                   props.cources.map(cource => (
//                     <option key={cource.id} value={JSON.stringify(cource)}>
//                       {cource.name}
//                     </option>
//                   ))}
//               </Input>

//               {selectCourceValidationErrors && (
//                 <p style={{ color: "red" }}>{selectCourceValidationErrors}</p>
//               )}
//             </FormGroup>

//             <FormGroup>
//               <Label>It knowledge Level</Label>
//               <Input
//                 defaultValue={1}
//                 type="select"
//                 name="select"
//                 id="select"
//                 onChange={hanldeSelectKnowledge}
//                 className="selectRegForm"
//               >
//                 <option value={1} disabled>
//                   --choose--
//                 </option>
//                 <option>Beginner</option>
//                 <option>junior</option>
//                 <option>middle</option>
//                 <option>Senior</option>option>
//               </Input>
//               {knowledgeValidationErrors && (
//                 <p style={{ color: "red" }}>{knowledgeValidationErrors}</p>
//               )}
//             </FormGroup>
//             <FormGroup>
//               <div className="input-group">
//                 <div className="input-group-prepend">
//                   <span className="input-group-text" id="inputGroupFileAddon01">
//                     Upload
//                   </span>
//                 </div>
//                 <div className="custom-file">
//                   <input
//                     type="file"
//                     accept="image/x-png,image/gif,image/jpeg"
//                     className="custom-file-input"
//                     onChange={handleChangePath}
//                     id="inputGroupFile01"
//                     aria-describedby="inputGroupFileAddon01"
//                     className="selectRegForm"
//                   />
//                   <label
//                     className="custom-file-label"
//                     htmlFor="inputGroupFile01"
//                   >
//                     "{path}"
//                   </label>
//                 </div>
//               </div>
//             </FormGroup>
//             <Button color="success" block onClick={handeleCreateStudent}>
//               Registration
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </>
//   );

//   function useFormInput(initialValue) {
//     const [value, setValue] = useState(initialValue);
//     function handlechange(e) {
//       setValue(e.target.value);
//     }
//     return {
//       value,
//       onChange: handlechange
//     };
//   }
// }

// export default compose(
//   firestoreConnect(() => ["statuses", "cources"]),
//   connect((state, props) => ({
//     statuses: state.firestore.ordered.statuses,
//     cources: state.firestore.ordered.cources
//   }))
// )(RegistrationForm);

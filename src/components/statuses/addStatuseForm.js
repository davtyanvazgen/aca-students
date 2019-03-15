// import React, { useState } from "react";
// import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
// import { withFirestore } from "react-redux-firebase";
// import { v1 } from "uuid";
// import Picker from "./picker";

// const AddStatuseForm = ({ firestore }) => {
//   const [name, setName] = useState("");
//   const [longName, setLongName] = useState("");
//   const [addStatusError, setAddStatusError] = useState("");
//   const [background, setBackground] = useState("#D21965");

//   function handleChangeComplete(color) {
//     setBackground(color.hex);
//     console.log(color.hex, typeof color.hex);
//   }

//   function handleChangeName(e) {
//     setName(e.target.value);
//   }
//   function handleChangeLongName(e) {
//     setLongName(e.target.value);
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (name.trim()) {
//       const newStatuse = {
//         id: v1(),
//         longName: longName.trim(),
//         name,
//         color: background
//       };

//       firestore
//         .collection("statuses")
//         .doc(newStatuse.id)
//         .set(newStatuse)
//         .catch(err => {
//           setAddStatusError(err);
//         });

//       setName("");
//       setLongName("");
//     }
//   }

//   return (
//     <>
//       <Col md={{ size: "3", offset: 3 }}>
//         <Form onSubmit={handleSubmit}>
//           <FormGroup>
//             <Label>Status`s short name</Label>
//             <Input
//               type="text"
//               placeholder="Enter short name of status"
//               value={name}
//               onChange={handleChangeName}
//             />
//             <Label>Status`s short long name</Label>
//             <Input
//               type="text"
//               placeholder="Enter long name of status"
//               value={longName}
//               onChange={handleChangeLongName}
//             />
//             <Button type="submit" style={{ display: "none" }} />
//           </FormGroup>
//         </Form>
//         <Button
//           className="mr-2"
//           size="sm"
//           style={{
//             backgroundColor: `${background}`,
//             border: "none"
//           }}
//         >
//           {name ? name : "Short status"}
//         </Button>

//         <Button
//           size="sm"
//           style={{
//             backgroundColor: `${background}`,
//             border: "none"
//           }}
//         >
//           {longName ? longName : "Long Status"}
//         </Button>
//         <hr />
//         <Button
//           size="sm"
//           type="submit"
//           color="success"
//           block
//           onClick={handleSubmit}
//         >
//           Add
//         </Button>
//       </Col>

//       <Col md="3">
//         <Picker
//           handleChangeComplete={handleChangeComplete}
//           name={name}
//           longName={longName}
//           background={background}
//         />
//       </Col>
//     </>
//   );
// };

// export default withFirestore(AddStatuseForm);

import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import { v1 } from "uuid";
import Picker from "./picker";

const AddStatuseForm = ({ firestore }) => {
  const [name, setName] = useState("");
  const [longName, setLongName] = useState("");
  const [addStatusError, setAddStatusError] = useState("");
  const [background, setBackground] = useState("#D21965");
  const [checkLetters, setCheckLetters] = useState("");

  function handleChangeComplete(color) {
    setBackground(color.hex);
    console.log(color.hex, typeof color.hex);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLongName(e) {
    setLongName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() && name.length <= 7) {
      const newStatuse = {
        id: v1(),
        longName: longName.trim() ? longName.trim() : name,
        name,
        color: background
      };

      firestore
        .collection("statuses")
        .doc(newStatuse.id)
        .set(newStatuse)
        .catch(err => {
          setAddStatusError(err);
        });

      setName("");
      setLongName("");
      setCheckLetters("");
    } else {
      setCheckLetters("Maximum length 7 letters");
    }
  }

  return (
    <>
      <Col md={{ size: "3", offset: 3 }}>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            {!checkLetters ? (
              <Label>Status`s short name</Label>
            ) : (
              <Label style={{ color: "red" }}>{checkLetters}</Label>
            )}

            <Input
              type="text"
              placeholder="Enter short name of status"
              value={name}
              onChange={handleChangeName}
            />
            <Label>Status`s short long name</Label>
            <Input
              type="text"
              placeholder="Enter long name of status"
              value={longName}
              onChange={handleChangeLongName}
            />
            <Button type="submit" style={{ display: "none" }} />
          </FormGroup>
        </Form>
        <Button
          className="mr-2"
          size="sm"
          style={{
            backgroundColor: `${background}`,
            border: "none"
          }}
        >
          {name ? name : "Short status"}
        </Button>

        <Button
          size="sm"
          style={{
            backgroundColor: `${background}`,
            border: "none"
          }}
        >
          {longName ? longName : "Long Status"}
        </Button>
        <hr />
        <Button
          size="sm"
          type="submit"
          color="success"
          block
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Col>

      <Col md="3">
        <Picker
          handleChangeComplete={handleChangeComplete}
          name={name}
          longName={longName}
          background={background}
        />
      </Col>
    </>
  );
};

export default withFirestore(AddStatuseForm);

import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label, Col } from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import { v1 } from "uuid";

const AddCourceForm = ({ firestore }) => {
  const [name, setName] = useState("");
  const [longName, setLongName] = useState("");
  const [addCourceError, setAddCourceError] = useState("");
  const [color, setColor] = useState("");
  const [checkLetters, setCheckLetters] = useState("");

  const handleChangeName = e => {
    setName(e.target.value);
  };

  const handleChangeLongName = e => {
    setLongName(e.target.value);
  };

  const generateColor = () => {
    const colors = [
      "#001f3f",
      "#0074D9",
      "#7FDBFF",
      "#39CCCC",
      "#3D9970",
      "#2ECC40",
      "#01FF70",
      "#FFDC00",
      "#FF851B",
      "#FF4136",
      "#85144b",
      "#F012BE",
      "#B10DC9",
      "#4a569d",
      "#ffe47a",
      "#757F9A",
      "#d7dde8",
      "#5C258D",
      "#71B280",
      "#8E54E9"
    ];
    const random = Math.floor(Math.random() * 20);
    setColor(colors[random]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() && name.length <= 7) {
      const newCource = {
        id: v1(),
        longName: longName.trim() ? longName.trim() : name,
        name,
        color
      };

      firestore
        .collection("cources")
        .doc(newCource.id)
        .set(newCource)
        .catch(err => {
          setAddCourceError(err);
        });

      setName("");
      setLongName("");
      setCheckLetters("");
    } else {
      setCheckLetters("Maximum length 7 letters");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} style={{ borderTop: "1px solid grey" }}>
        <FormGroup>
          {!checkLetters ? (
            <Label>Course`s short name</Label>
          ) : (
            <Label style={{ color: "red" }}>{checkLetters}</Label>
          )}
          <Input
            type="text"
            placeholder="Enter short name"
            value={name}
            onChange={handleChangeName}
          />

          <Label>Long name</Label>
          <Input
            type="text"
            placeholder="Enter long name"
            value={longName}
            onChange={handleChangeLongName}
          />
        </FormGroup>
      </Form>

      <Button size="sm" style={{ backgroundColor: color }} className="mr-2">
        {name ? name : "Short name"}
      </Button>

      <Button size="sm" style={{ backgroundColor: color }}>
        {longName ? longName : "Long name"}
      </Button>

      <Button
        className="float-right"
        type="submit"
        color="info"
        size="sm"
        onClick={generateColor}
      >
        Generate color
      </Button>
      <hr />

      <Button
        onClick={handleSubmit}
        type="submit"
        color="success"
        block
        size="sm"
      >
        Add
      </Button>
    </>
  );
};

export default withFirestore(AddCourceForm);

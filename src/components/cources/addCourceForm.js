import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label, Col } from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import { v1 } from "uuid";

const AddCourceForm = ({ firestore }) => {
  const [name, setName] = useState("");
  const [longName, setLongName] = useState("");
  const [addCourceError, setAddCourceError] = useState("");
  const [color, setColor] = useState("");

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
    if (name.trim()) {
      const newCource = {
        id: v1(),
        longName: longName.trim(),
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
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} style={{ borderTop: "1px solid grey" }}>
        <FormGroup>
          <Label style={{ textAlign: "center", margin: "7px auto " }}>
            Short name
          </Label>
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

      <div style={{ textAlign: "center" }}>
        <Button
          size="sm"
          style={{ backgroundColor: color, minWidth: "220px" }}
          className="mr-2"
        >
          {name ? name : "Short name"}
        </Button>

        <Button size="sm" style={{ backgroundColor: color, minWidth: "220px" }}>
          {longName ? longName : "Long name"}
        </Button>
      </div>
      <hr />
      <Button
        type="submit"
        color="info"
        block
        size="sm"
        onClick={generateColor}
      >
        Generate color
      </Button>

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

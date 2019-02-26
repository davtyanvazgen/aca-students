import React, { useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

export default function Statuse(props) {
  const { statuse } = props;
  const [newStatuse, setNewStatuse] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleEditStatusInp = e => {
    setNewStatuse(e.target.value);
  };

  const toggle = () => {
    isOpen === false ? setIsOpen(true) : setIsOpen(false);
    setNewStatuse("");
  };

  const handleRemove = statuse => {
    props.removeStatuse(statuse);
  };

  const handleEdit = newStatuse => {
    const editStatus = {
      name: newStatuse,
      id: statuse.id
    };
    props.editStatuse(editStatus);
    setNewStatuse("");
    setIsOpen(false);
  };

  return (
    <div>
      <ListGroup>
        <ListGroupItem key={statuse.id} color="warning">
          {statuse.name}

          <Button
            className="float-right"
            size="sm"
            color="danger"
            onClick={() => {
              handleRemove(statuse);
            }}
          >
            Delete
          </Button>

          {!isOpen && (
            <Button
              className="float-right mr-1"
              size="sm"
              color="warning"
              onClick={toggle}
            >
              Edit
            </Button>
          )}

          {isOpen && (
            <div style={{ marginTop: "10px" }}>
              <InputGroup>
                <Input
                  className="form-control-sm"
                  type="text"
                  placeholder="Update status"
                  value={newStatuse}
                  onChange={handleEditStatusInp}
                />
                <InputGroupAddon addonType="append">
                  <Button onClick={toggle} size="sm" color="primary">
                    No
                  </Button>
                </InputGroupAddon>

                <InputGroupAddon addonType="append">
                  <Button
                    size="sm"
                    color="warning"
                    onClick={() => {
                      handleEdit(newStatuse);
                    }}
                  >
                    Yes
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
          )}
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}

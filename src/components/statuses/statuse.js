import React, { useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import { withFirestore } from "react-redux-firebase";

const Statuse = ({ statuse, firestore }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newStatuse, setNewStatuse] = useState(statuse.name);
  const [deleteStatusError, setDeleteStatusError] = useState("");
  const [editStatusError, setEditStatusError] = useState("");

  const handleRemove = statuse => {
    firestore
      .collection("statuses")
      .doc(statuse.id)
      .delete()
      .catch(err => {
        setDeleteStatusError(err);
      });
  };

  const handleEditStatuse = e => {
    setNewStatuse(e.target.value);
  };

  const confirmEditStatuse = newStatuse => {
    if (newStatuse.trim()) {
      const editStatus = {
        name: newStatuse,
        id: statuse.id
      };

      firestore
        .collection("statuses")
        .doc(statuse.id)
        .update({ ...editStatus })
        .catch(err => {
          setEditStatusError(err);
        });
      setIsOpen(false);
    }
  };

  const toggle = () => {
    isOpen === false ? setIsOpen(true) : setIsOpen(false);
    setNewStatuse(statuse.name);
  };

  return (
    <div>
      <ListGroup>
        <ListGroupItem key={statuse.id} color="warning">
          {!isOpen && (
            <>
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
            </>
          )}
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
                  autoFocus
                  className="form-control-sm"
                  type="text"
                  placeholder="Update status"
                  value={newStatuse}
                  onChange={handleEditStatuse}
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
                      confirmEditStatuse(newStatuse);
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
};

export default withFirestore(Statuse);

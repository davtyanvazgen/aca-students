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
import DeleteStatusModal from "./deleteStatusModal";

const Statuse = ({ statuse, firestore, students }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [newName, setNewName] = useState(statuse.name);
  const [newLongName, setNewLongName] = useState(statuse.longName);
  const [deleteStatusError, setDeleteStatusError] = useState("");
  const [editStatusError, setEditStatusError] = useState("");
  const [removeStudentError, setRemoveStudentsError] = useState("");
  const [studentsSameStatus, setStudentsSameStatus] = useState([]);

  const areYouSure = statuse => {
    // const studentsForDelete = [];

    const studentsForDelete = students.filter(
      student => student.status === statuse.id
    );
    setStudentsSameStatus(studentsForDelete);
    setModalShow(true);
  };

  const handleRemove = statuse => {
    studentsSameStatus.map(student => {
      firestore
        .collection("students")
        .doc(student.id)
        .delete()
        .catch(err => {
          setRemoveStudentsError(err);
        });
    });

    firestore
      .collection("statuses")
      .doc(statuse.id)
      .delete()
      .catch(err => {
        setDeleteStatusError(err);
      });
  };

  const handleEditStatusName = e => {
    setNewName(e.target.value);
  };
  const handleEditStatusLongName = e => {
    setNewLongName(e.target.value);
  };

  const confirmEditStatuse = newName => {
    if (newName.trim()) {
      const editStatus = {
        name: newName,
        longName: newLongName.trim(),
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
    setNewName(statuse.name);
    setNewLongName(statuse.longName);
  };

  const modalClose = () => {
    setStudentsSameStatus([]);
    setModalShow(false);
  };

  return (
    <div>
      <DeleteStatusModal
        show={modalShow}
        onHide={modalClose}
        studentsSameStatus={studentsSameStatus}
        statuse={statuse}
        handleRemove={() => handleRemove(statuse)}
      />

      <ListGroup>
        <ListGroupItem key={statuse.id} color="warning">
          {!isOpen && (
            <>
              {`${statuse.name}  |  ${statuse.longName}`}
              <Button
                className="float-right"
                size="sm"
                color="danger"
                onClick={() => {
                  areYouSure(statuse);
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
                  value={newName}
                  onChange={handleEditStatusName}
                />
                <Input
                  className="form-control-sm"
                  type="text"
                  placeholder="Update status"
                  value={newLongName}
                  onChange={handleEditStatusLongName}
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
                      confirmEditStatuse(newName);
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

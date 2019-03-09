import React, { useState } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import DeleteCourceModal from "./deleteCourceModal";

const Cource = ({ cource, students, firestore }) => {
  const [modalShow, setModalShow] = useState(false);
  const [removeStudentsError, setRemoveStudentsError] = useState("");
  const [removaCourceError, setRemovaCourceError] = useState("");
  const [studentsSameCource, setStudentsSameCource] = useState([]);

  const areYouSure = cource => {
    const studentsForDelete = students.filter(
      student => student.cource === cource.id
    );
    setStudentsSameCource(studentsForDelete);
    setModalShow(true);
  };

  const handleRemove = cource => {
    studentsSameCource.map(student => {
      firestore
        .collection("students")
        .doc(student.id)
        .delete()
        .catch(err => {
          setRemoveStudentsError(err);
        });
    });

    firestore
      .collection("cources")
      .doc(cource.id)
      .delete()
      .catch(err => {
        setRemovaCourceError(err);
      });

    setModalShow(false);
  };

  const modalClose = () => {
    setStudentsSameCource([]);
    setModalShow(false);
  };

  return (
    <div>
      <ListGroup>
        <ListGroupItem key={cource.id} color="success">
          {`${cource.name}  |  ${cource.longName}`}
          <Button
            className="float-right"
            size="sm"
            color="danger"
            onClick={() => {
              areYouSure(cource);
            }}
          >
            Delete
          </Button>

          <DeleteCourceModal
            show={modalShow}
            onHide={modalClose}
            studentsSameCource={studentsSameCource}
            cource={cource}
            handleRemove={() => handleRemove(cource)}
          />
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default withFirestore(Cource);

import React, { useState } from "react";
import { Button, Card, CardText, CardBody, CardTitle, Row } from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import DeleteCourceModal from "./deleteCourceModal";
import EditCourceModal from "./editCourceModal";

const Cource = ({ cource, students, firestore }) => {
  const [modalShow, setModalShow] = useState(false);
  const [studentsSameCource, setStudentsSameCource] = useState([]);
  const [removeStudentsError, setRemoveStudentsError] = useState("");
  const [removaCourceError, setRemovaCourceError] = useState("");
  const [modalShowEdit, setModalShowEdit] = useState(false);

  const areYouSure = cource => {
    const studentsForDelete = students.filter(
      student => student.cource === cource.id
    );
    setStudentsSameCource(studentsForDelete);
    setModalShow(true);
  };

  const handleRemove = cource => {
    studentsSameCource.forEach(student => {
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

  const editModalClose = () => {
    setModalShowEdit(false);
  };
  return (
    <div>
      <Card
        key={cource.id}
        style={{
          borderRadius: "7px",
          boxShadow: `0 0 15px ${cource.color}`,
          border: "none"
        }}
      >
        <CardBody
          style={{
            padding: "0px 0px 20px 0px",
            backgroundColor: "#dfebef",
            borderRadius: "7px"
          }}
        >
          <CardTitle
            style={{
              borderRadius: "7px 7px 0px 0px",
              padding: "10px 0 10px 15px",
              backgroundColor: cource.color
            }}
          >
            <h5 style={{ color: "white" }}>{cource.longName}</h5>
          </CardTitle>
          <CardText style={{ marginLeft: "10px" }}>
            Short name: {cource.name}
          </CardText>
          <div style={{ marginTop: "50px" }}>
            <Button
              size="sm"
              color="danger"
              className="float-right  mr-2"
              onClick={() => {
                areYouSure(cource);
              }}
            >
              Delete
            </Button>
            <Button
              size="sm"
              color="success"
              className="float-right mr-1"
              onClick={() => setModalShowEdit(true)}
            >
              Edit
            </Button>
          </div>
        </CardBody>
      </Card>

      <DeleteCourceModal
        show={modalShow}
        onHide={modalClose}
        studentsSameCource={studentsSameCource}
        cource={cource}
        handleRemove={() => handleRemove(cource)}
      />

      <EditCourceModal
        show={modalShowEdit}
        onHide={editModalClose}
        cource={cource}
        students={students}
      />
    </div>
  );
};

export default withFirestore(Cource);

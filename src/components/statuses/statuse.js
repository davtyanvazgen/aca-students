import React, { useState } from "react";
import { Button, Card, CardBody, CardTitle, CardText } from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import DeleteStatusModal from "./deleteStatusModal";
import EditStatuseModal from "./editStatusModal";

const Statuse = ({ statuse, firestore, students }) => {
  const [modalShow, setModalShow] = useState(false);
  const [studentsSameStatus, setStudentsSameStatus] = useState([]);
  const [removeStudentError, setRemoveStudentsError] = useState("");
  const [deleteStatusError, setDeleteStatusError] = useState("");
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [editStatusError, setEditStatusError] = useState("");

  const areYouSure = statuse => {
    const studentsForDelete = students.filter(
      student => student.status === statuse.id
    );
    setStudentsSameStatus(studentsForDelete);
    setModalShow(true);
  };

  const handleRemove = statuse => {
    studentsSameStatus.forEach(student => {
      firestore
        .collection("deletedStudents")
        .doc(student.id)
        .set(student);
    });

    studentsSameStatus.forEach(student => {
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

    setModalShow(false);
  };

  const modalClose = () => {
    setStudentsSameStatus([]);
    setModalShow(false);
  };

  const editModalClose = () => {
    setModalShowEdit(false);
  };
  console.log(studentsSameStatus);

  return (
    <div>
      <Card
        key={statuse.id}
        style={{
          borderRadius: "7px",
          boxShadow: `0 0 15px ${statuse.color}`,
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
              backgroundColor: statuse.color
            }}
          >
            <h5 style={{ color: "white" }}>{statuse.longName}</h5>
          </CardTitle>
          <CardText style={{ marginLeft: "10px" }}>
            Short name: {statuse.name}
          </CardText>
          <div style={{ marginTop: "50px" }}>
            {statuse.id !== "fc4a5a70-4739-11e9-8e2b-71e4e6f455b5" ? (
              <>
                <Button
                  size="sm"
                  color="danger"
                  className="float-right  mr-2"
                  onClick={() => {
                    areYouSure(statuse);
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
              </>
            ) : (
              <Button
                size="sm"
                color="success"
                className="float-right mr-1"
                onClick={() => setModalShowEdit(true)}
              >
                Edit
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      <DeleteStatusModal
        show={modalShow}
        onHide={modalClose}
        studentsSameStatus={studentsSameStatus}
        statuse={statuse}
        handleRemove={() => handleRemove(statuse)}
      />

      <EditStatuseModal
        show={modalShowEdit}
        onHide={editModalClose}
        statuse={statuse}
        students={students}
      />
    </div>
  );
};

export default withFirestore(Statuse);

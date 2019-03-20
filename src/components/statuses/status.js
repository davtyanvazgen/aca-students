import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Input,
  Row
} from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import DeleteStatusModal from "./deleteStatusModal";
import EditStatusModal from "./editStatusModal";

const Status = ({ statuses, status, firestore, students }) => {
  const [modalShow, setModalShow] = useState(false);
  const [studentsSameStatus, setStudentsSameStatus] = useState([]);
  const [modalShowEdit, setModalShowEdit] = useState(false);

  const areYouSure = status => {
    const studentsForDelete = students.filter(
      student => student.status === status.id
    );
    setStudentsSameStatus(studentsForDelete);
    setModalShow(true);
  };

  const handleSortSelect = e => {
    let sort = parseInt(e.target.value);
    firestore
      .collection("statuses")
      .doc(status.id)
      .update({ sort })
      .catch(err => {
        alert(err.message);
      });
    if (status.sort > sort) {
      for (let i = sort; i < status.sort; i++) {
        statuses.forEach(el => {
          if (el.sort === i) {
            firestore
              .collection("statuses")
              .doc(el.id)
              .update({ sort: i + 1 })
              .catch(err => {
                alert(err.message);
              });
          }
        });
      }
    }
    if (status.sort < sort) {
      for (let i = status.sort + 1; i <= sort; i++) {
        statuses.forEach(el => {
          if (el.sort === i) {
            firestore
              .collection("statuses")
              .doc(el.id)
              .update({ sort: i - 1 })
              .catch(err => {
                alert(err.message);
              });
          }
        });
      }
    }
  };

  const handleRemove = () => {
    for (let i = status.sort + 1; i <= statuses.length; i++) {
      statuses.forEach(el => {
        if (el.sort === i) {
          firestore
            .collection("statuses")
            .doc(el.id)
            .update({ sort: i - 1 })
            .catch(err => {
              alert(err.message);
            });
        }
      });
    }

    studentsSameStatus.forEach(student => {
      firestore
        .collection("deletedStudents")
        .doc(student.id)
        .set(student)
        .catch(err => {
          alert(err.message);
        });
    });

    studentsSameStatus.forEach(student => {
      firestore
        .collection("students")
        .doc(student.id)
        .delete()
        .catch(err => {
          alert(err.message);
        });
    });

    firestore
      .collection("statuses")
      .doc(status.id)
      .delete()
      .catch(err => {
        alert(err.message);
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

  return (
    <div>
      <Card
        key={status.id}
        className="card"
        style={{ boxShadow: `0 0 15px ${status.color}` }}
      >
        <CardBody className="cardBody">
          <CardTitle
            style={{ backgroundColor: status.color }}
            className="cardTitle"
          >
            <Row className="roWW">
              <Col xs="10">
                <h5 className="white">{status.name}</h5>
              </Col>
              <Col xs="2" className="select">
                <Input
                  className="select selectSize"
                  bsSize="sm"
                  type="select"
                  value={status.sort}
                  onChange={handleSortSelect}
                >
                  {statuses.map(el => (
                    <option key={el.id} value={el.sort}>
                      {el.sort}
                    </option>
                  ))}
                </Input>
              </Col>
            </Row>
          </CardTitle>
          <CardText className="cardText" style={{ color: `${status.color}` }}>
            <strong>{status.longName}</strong>
          </CardText>
          <div className="deleteEdit">
            {status.id !== "fc4a5a70-4739-11e9-8e2b-71e4e6f455b5" ? (
              <>
                <Button
                  size="sm"
                  color="danger"
                  className="float-right  mr-2"
                  onClick={() => {
                    areYouSure(status);
                  }}
                >
                  Delete
                </Button>
                <Button
                  size="sm"
                  color="success"
                  className="float-right mr-2"
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
        status={status}
        handleRemove={handleRemove}
      />

      <EditStatusModal
        show={modalShowEdit}
        onHide={editModalClose}
        status={status}
        students={students}
      />
    </div>
  );
};

export default withFirestore(Status);

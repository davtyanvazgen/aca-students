import React, { useState } from "react";
import {
  Button,
  Card,
  CardText,
  CardBody,
  CardTitle,
  Row,
  Input,
  Col
} from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import DeleteCourseModal from "./deleteCourseModal";
import EditCourseModal from "./editCourseModal";

const Course = ({ courses, course, students, firestore ,firebase }) => {
  const [modalShow, setModalShow] = useState(false);
  const [studentsSameCourse, setStudentsSameCourse] = useState([]);
  const [removeStudentsError, setRemoveStudentsError] = useState("");
  const [removaCourseError, setRemovaCourseError] = useState("");
  const [modalShowEdit, setModalShowEdit] = useState(false);

  const areYouSure = course => {
    const studentsForDelete = students.filter(
      student => student.course === course.id
    );
    setStudentsSameCourse(studentsForDelete);
    setModalShow(true);
  };

  const handleSortSelect = e => {
    let sort = parseInt(e.target.value);
    firestore
      .collection("courses")
      .doc(course.id)
      .update({ sort });
    if (course.sort > sort) {
      for (let i = sort; i < course.sort; i++) {
        courses.forEach(el => {
          if (el.sort === i) {
            firestore
              .collection("courses")
              .doc(el.id)
              .update({ sort: i + 1 });
          }
        });
      }
    }
    if (course.sort < sort) {
      for (let i = course.sort + 1; i <= sort; i++) {
        courses.forEach(el => {
          if (el.sort === i) {
            firestore
              .collection("courses")
              .doc(el.id)
              .update({ sort: i - 1 });
          }
        });
      }
    }
  };

  const handleRemove = () => {
    for (let i = course.sort + 1; i <= courses.length; i++) {
      courses.forEach(el => {
        if (el.sort === i) {
          firestore
            .collection("courses")
            .doc(el.id)
            .update({ sort: i - 1 });
        }
      });
    }

    studentsSameCourse.forEach(student => {
      firestore
        .collection("deletedStudents")
        .doc(student.id)
        .set(student);
    });

    studentsSameCourse.forEach(student => {
      const  storage = firebase.storage();
      const  storageRef = storage.ref();
      storageRef.child(`studentsAvatar/${student.imageName}`).delete().then(function() {
        }).catch(function(error) {
      })
   
      firestore
        .collection("students")
        .doc(student.id)
        .delete()
        .catch(err => {
          setRemoveStudentsError(err);
        });
    });

    firestore
      .collection("courses")
      .doc(course.id)
      .delete()
      .catch(err => {
        setRemovaCourseError(err);
      });

    setModalShow(false);
  };

  const modalClose = () => {
    setStudentsSameCourse([]);
    setModalShow(false);
  };

  const editModalClose = () => {
    setModalShowEdit(false);
  };

  return (
    <div>
      <Card
        key={course.id}
        className="card"
        style={{ boxShadow: `0 0 15px ${course.color}` }}
      >
        <CardBody className="cardBody">
          <CardTitle
            className="cardTitle"
            style={{ backgroundColor: course.color }}
          >
            <Row className="roWW">
              <Col xs="10">
                <h5 className="white">{course.name}</h5>
              </Col>
              <Col xs="2" className="select">
                <Input
                  className="select selectSize"
                  bsSize="sm"
                  type="select"
                  value={course.sort}
                  onChange={handleSortSelect}
                >
                  {courses.map(el => (
                    <option key={el.id} value={el.sort}>
                      {el.sort}
                    </option>
                  ))}
                </Input>
              </Col>
            </Row>
          </CardTitle>
          <CardText className="cardText" style={{ color: `${course.color}` }}>
            <strong>{course.longName}</strong>
          </CardText>
          <div className="deleteEdit">
            <Button
              size="sm"
              color="danger"
              className="float-right  mr-2"
              onClick={() => {
                areYouSure(course);
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
          </div>
        </CardBody>
      </Card>

      <DeleteCourseModal
        show={modalShow}
        onHide={modalClose}
        studentsSameCourse={studentsSameCourse}
        course={course}
        handleRemove={handleRemove}
      />

      <EditCourseModal
        show={modalShowEdit}
        onHide={editModalClose}
        course={course}
        students={students}
      />
    </div>
  );
};

export default withFirestore(Course);

import React, { useState } from "react";
import EditStudentModal from "../../containers/editInfoStudent";
import { firestoreConnect, withFirestore } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserTimes, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import DeleteStudentModal from "./deleteStudentModal";
import {
  ListGroupItem,
  Media,
  Row,
  Col,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse
} from "reactstrap";

const StudentCard = props => {
  const { statuses, courses, student, firestore } = props;
  const [modalShow, setModalShow] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [isOpenCourse, setIsOpenCourse] = useState(false);
  const [collapse, setcollapse] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(
    statuses.filter(status => status.id === student.status)
  );
  const [currentCourse, setCurrentCourse] = useState(
    courses.filter(course => course.id === student.course)
  );

  function toggle() {
    setcollapse(!collapse);
  }

  function handleRemove() {
    firestore
      .collection("students")
      .doc(student.id)
      .delete();

    firestore
      .collection("deletedStudents")
      .doc(student.id)
      .set(student);
  }

  function handleSelectCourseChange(e) {
    let newCourse = courses.filter(
      course => course.longName === e.target.value
    );
    setCurrentCourse(newCourse);
    firestore
      .collection("students")
      .doc(student.id)
      .update({
        course: newCourse[0].id,
        courseName: newCourse[0].longName
      });
  }

  function handleSelectStatusChange(e) {
    let newStatus = statuses.filter(
      status => status.longName === e.target.value
    );
    setCurrentStatus(newStatus);

    firestore
      .collection("students")
      .doc(student.id)
      .update({
        status: newStatus[0].id,
        statusName: newStatus[0].longName
      });
  }

  function toggleStatus() {
    setIsOpenStatus(!isOpenStatus);
  }
  function toggleCourse() {
    setIsOpenCourse(!isOpenCourse);
  }

  function handleEdit() {
    setModalShow(true);
  }
  function handleOnHide() {
    setModalShow(false);
  }

  function toggleDeleteStudent() {
    setModal(!modal);
  }

  const appData = `App date: ${student.date
    .toDate()
    .getDate()}/${student.date.toDate().getMonth() +
    1}/${student.date.toDate().getFullYear()}`;

  return (
    <>
      <ListGroupItem
        style={{
          border: "1px solid #cbccce",
          borderRight: `5px solid ${currentStatus[0].color}`,
          borderLeft: `5px solid ${currentCourse[0].color}`,
          backgroundColor: props.background
        }}
      >
        <Row>
          <Col xs="5" md="2" onClick={toggle}>
            <Media
              style={{ backgroundImage: `url(${student.url})` }}
              className="media"
              object
            />
          </Col>

          <Col xs="6" md="5" className="colwr" onClick={toggle}>
            <p className="fullname">{student.fullName.toUpperCase()}</p>
            <p className="registerDate">{appData}</p>
          </Col>

          <Col xs="10" md="4">
            <Row className="dropRow">
              <ButtonDropdown
                direction="left"
                isOpen={isOpenStatus}
                toggle={toggleStatus}
              >
                <DropdownToggle
                  className="badge badge-pill badges"
                  style={{
                    backgroundColor: currentStatus[0].color,
                    borderColor: currentStatus[0].color
                  }}
                  caret
                  size="sm"
                >
                  {student.statusName}
                </DropdownToggle>
                <DropdownMenu>
                  {statuses &&
                    statuses.map(status => (
                      <DropdownItem
                        key={status.id}
                        value={status.longName}
                        onClick={handleSelectStatusChange}
                      >
                        {status.longName}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </ButtonDropdown>
            </Row>
            <Row className="blockRow">
              <ButtonDropdown
                direction="left"
                isOpen={isOpenCourse}
                toggle={toggleCourse}
              >
                <DropdownToggle
                  className="badge badge-pill badges"
                  style={{
                    backgroundColor: currentCourse[0].color,
                    borderColor: currentCourse[0].color
                  }}
                  caret
                  size="sm"
                >
                  {student.courseName}
                </DropdownToggle>
                <DropdownMenu>
                  {courses &&
                    courses.map(course => (
                      <DropdownItem
                        key={course.id}
                        value={course.longName}
                        onClick={handleSelectCourseChange}
                      >
                        {course.longName}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </ButtonDropdown>
            </Row>
          </Col>

          <Col xs="1">
            <Row>
              <Col className="center">
                <FontAwesomeIcon
                  icon="user-times"
                  onClick={toggleDeleteStudent}
                />
                <hr />
                <FontAwesomeIcon icon="user-edit" onClick={handleEdit} />
              </Col>
            </Row>
          </Col>
        </Row>

        <Collapse isOpen={collapse}>
          <hr />
          <Row>
            <Col xs="12" md="4" className="center">
              <span>Email: </span>
              <br />
              {student.email}
            </Col>
            <Col xs="12" md="2" className="center">
              <span>Phone: </span>
              <br />
              {student.phone}
            </Col>
            <Col xs="12" md="6" className="center">
              <span>Knowledge: </span>
              <br />
              {student.knowledge}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col className="center">
              <span>Comment: </span>
              {student.comment}
            </Col>
          </Row>
        </Collapse>

        <EditStudentModal
          show={modalShow}
          onHide={handleOnHide}
          student={student}
        />
        <DeleteStudentModal
          toggleDeleteStudent={toggleDeleteStudent}
          modal={modal}
          student={student.fullName}
          handleRemove={handleRemove}
        />
      </ListGroupItem>
    </>
  );
};

export default compose(
  firestoreConnect(() => ["statuses", "courses"]),
  connect((state, props) => ({
    statuses: state.firestore.ordered.statuses,
    courses: state.firestore.ordered.courses
  }))
)(withFirestore(StudentCard));

library.add(faUserTimes, faUserEdit);

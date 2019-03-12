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
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse
} from "reactstrap";
// import { Collapse } from "react-bootstrap";

function StudentCard(props) {
  const { statuses, cources, student, firestore } = props;
  const [modalShow, setModalShow] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [isOpenCource, setIsOpenCource] = useState(false);
  const [collapse, setcollapse] = useState(false);
  const [modal, setModal] = useState(false);

  function toggle() {
    setcollapse(!collapse);
  }

  function handleRemove() {
    firestore
      .collection("students")
      .doc(student.id)
      .delete();
  }

  function handleSelectCourceChange(e) {
    let newCource = cources.filter(cource => cource.name === e.target.value);
    firestore
      .collection("students")
      .doc(student.id)
      .update({
        cource: newCource[0].id,
        courceName: newCource[0].name
      });
  }

  function handleSelectStatusChange(e) {
    let newStatuse = statuses.filter(
      statuse => statuse.name === e.target.value
    );
    firestore
      .collection("students")
      .doc(student.id)
      .update({
        status: newStatuse[0].id,
        statusName: newStatuse[0].name
      });
  }

  function toggleStatus() {
    setIsOpenStatus(!isOpenStatus);
  }
  function toggleCource() {
    setIsOpenCource(!isOpenCource);
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

  return (
    <>
      <ListGroupItem style={{ border: "1px solid grey" }}>
        <Row>
          <Col xs="5" md="2">
            <Media
              style={{ maxHeight: "80px", borderRadius: "50%" }}
              object
              src="https://i.pinimg.com/originals/02/f3/87/02f38779c48e8880536a51c309227c8c.gif"
              alt="Generic placeholder image"
            />
          </Col>

          <Col
            xs="6"
            md="5"
            style={{ wordWrap: "break-word" }}
            onClick={toggle}
          >
            <p>{student.fullName.toUpperCase()}</p>
            <p>{student.date}</p>
          </Col>

          <Col xs="10" md="4">
            <Row>
              <ButtonDropdown
                direction="left"
                style={{ width: "100%" }}
                isOpen={isOpenStatus}
                toggle={toggleStatus}
              >
                <DropdownToggle color="success" caret size="sm">
                  {student.statusName}
                </DropdownToggle>
                <DropdownMenu>
                  {statuses &&
                    statuses.map(status => (
                      <DropdownItem
                        key={status.id}
                        value={status.name}
                        onClick={handleSelectStatusChange}
                      >
                        {status.name}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </ButtonDropdown>
            </Row>
            <Row>
              <ButtonDropdown
                direction="left"
                style={{ width: "100%" }}
                isOpen={isOpenCource}
                toggle={toggleCource}
              >
                <DropdownToggle color="info" caret size="sm">
                  {student.courceName}
                </DropdownToggle>
                <DropdownMenu>
                  {cources &&
                    cources.map(cource => (
                      <DropdownItem
                        key={cource.id}
                        value={cource.name}
                        onClick={handleSelectCourceChange}
                      >
                        {cource.name}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </ButtonDropdown>
            </Row>
          </Col>

          <Col xs="1">
            <Row>
              <Col style={{ textAlign: "center" }}>
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
            <Col>
              <span style={{ color: "yellowgreen" }}>Email: </span>
              {student.email}
            </Col>
            <Col>
              <span style={{ color: "yellowgreen" }}>Phone: </span>
              {student.phone}
            </Col>
            <Col>
              <span style={{ color: "yellowgreen" }}>Knowledge: </span>
              {student.knowledge}
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
}

export default compose(
  firestoreConnect(() => ["statuses", "cources"]),
  connect((state, props) => ({
    statuses: state.firestore.ordered.statuses,
    cources: state.firestore.ordered.cources
  }))
)(withFirestore(StudentCard));

library.add(faUserTimes, faUserEdit);

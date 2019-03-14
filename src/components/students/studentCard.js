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

function StudentCard(props) {
  const { statuses, cources, student, firestore } = props;
  const [modalShow, setModalShow] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [isOpenCource, setIsOpenCource] = useState(false);
  const [collapse, setcollapse] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(statuses.filter(statuse => statuse.id === student.status));
  const [currentCource, setCurrentCource] = useState(cources.filter(cource => cource.id === student.cource));


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
    let newCource = cources.filter(cource => cource.longName === e.target.value);
    setCurrentCource(newCource);
    firestore
      .collection("students")
      .doc(student.id)
      .update({
        cource: newCource[0].id,
        courceName: newCource[0].longName
      });
  }

  function handleSelectStatusChange(e) {
    let newStatuse = statuses.filter(
      statuse => statuse.longName === e.target.value
    );
    setCurrentStatus(newStatuse);

      firestore
      .collection("students")
      .doc(student.id)
      .update({
        status: newStatuse[0].id,
        statusName: newStatuse[0].longName
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
      <ListGroupItem style={{ border: "1px solid #cbccce", borderRight: `5px solid ${currentStatus[0].color}`, borderLeft: `5px solid ${currentCource[0].color}` , backgroundColor: props.background  }}>
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
            <p style={{marginBottom: "0rem", marginTop: "1rem"}}>{student.fullName.toUpperCase()}</p>
            <p style={{marginBottom: "0rem"}}>{student.date}</p>
          </Col>

          <Col xs="10" md="4">
            <Row style={{display: "block", marginTop: "5%"}}>
              <ButtonDropdown
                direction="left"
                isOpen={isOpenStatus}
                toggle={toggleStatus}
              >
                <DropdownToggle className="badge badge-pill" style={{backgroundColor: currentStatus[0].color, borderColor: currentStatus[0].color}} caret size="sm">
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
            <Row style={{display: "block"}}>
              <ButtonDropdown
                direction="left"
                isOpen={isOpenCource}
                toggle={toggleCource}
              >
                <DropdownToggle className="badge badge-pill"  style={{backgroundColor: currentCource[0].color, borderColor: currentCource[0].color}} caret size="sm">
                  {student.courceName}
                </DropdownToggle>
                <DropdownMenu>
                  {cources &&
                    cources.map(cource => (
                      <DropdownItem
                        key={cource.id}
                        value={cource.longName}
                        onClick={handleSelectCourceChange}
                      >
                        {cource.longName}
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
              <Col xs="12" md="4" style={{ textAlign: "center" }}>
                <span style={{ color: "yellowgreen" }}>Email: </span>
                <br />
                {student.email}
              </Col>
              <Col xs="12" md="2" style={{ textAlign: "center" }}>
                <span style={{ color: "yellowgreen" }}>Phone: </span>
                <br />
                {student.phone}
              </Col>
              <Col xs="12" md="6" style={{ textAlign: "center" }}>
                <span style={{ color: "yellowgreen" }}>Knowledge: </span>
                <br />
                {student.knowledge}
              </Col>
            </Row>
            <hr />
            <Row>
                <Col style={{ textAlign: "center" }}>
                    <span style={{ color: "yellowgreen" }}>Comment: </span>{student.comment}
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

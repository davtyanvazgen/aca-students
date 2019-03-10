import React, { useState } from "react";
// import { Button, ListGroup, Image, Card } from "react-bootstrap";
import EditStudentModal from "../../containers/editInfoStudent";
import { firestoreConnect, withFirestore } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  ListGroup,
  ListGroupItem,
  Media,
  Row,
  Col,
  Input,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

function StudentCard(props) {
  const { statuses, cources, student, firestore } = props;
  const [selectedCource, setCource] = useState(student.courceName);
  const [selectedStatuse, setStatuse] = useState(student.statusName);
  const [isHidden, setHidden] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [isOpenCource, setIsOpenCource] = useState(false);

  function handleRemove() {
    firestore
      .collection("students")
      .doc(student.id)
      .delete();
  }

  function handleSelectCourceChange(e) {
    setCource(e.target.value);
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
    setStatuse(e.target.value);
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

  function toggleMoreInfo() {
    setShowInfo(!showInfo);
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

  return (
    <>
      <ListGroup>
        <ListGroupItem color="info">
          <Row style={{ border: "1px solid white" }}>
            <Col
              sm={{ size: 2 }}
              style={{ border: "1px solid red", paddingLeft: "0px" }}
            >
              <Media
                style={{
                  width: "90px",
                  height: "90px"
                }}
                object
                src="https://i.pinimg.com/originals/02/f3/87/02f38779c48e8880536a51c309227c8c.gif"
                alt="Generic placeholder image"
              />
            </Col>

            <Col sm={{ size: 10 }} style={{ border: "1px solid blue" }}>
              <Row>
                <Col sm={{ size: 9 }} style={{ border: "1px solid blue" }}>
                  <p>{`${student.fullName.toUpperCase()} ${student.date}`}</p>

                  <ButtonDropdown isOpen={isOpenStatus} toggle={toggleStatus}>
                    <DropdownToggle color="warning" caret size="sm">
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

                  <ButtonDropdown isOpen={isOpenCource} toggle={toggleCource}>
                    <DropdownToggle color="warning" caret size="sm">
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
                </Col>

                <Col sm={{ size: 3 }} style={{ border: "1px solid red" }}>
                  <Button
                    className="float-right "
                    size="sm"
                    color="danger"
                    onClick={handleRemove}
                    block
                  >
                    Delete
                  </Button>
                  <Button
                    className="float-right"
                    size="sm"
                    color="warning"
                    onClick={handleEdit}
                    block
                  >
                    Edit
                  </Button>
                  <Button
                    className="float-right"
                    size="sm"
                    color="success"
                    block
                    onClick={toggleMoreInfo}
                  >
                    More info
                  </Button>
                </Col>
              </Row>

              {showInfo && (
                <ListGroup>
                  <ListGroupItem disabled>
                    E-mail: {student.email}
                  </ListGroupItem>
                  <ListGroupItem disabled>Phone: {student.phone}</ListGroupItem>
                  <ListGroupItem disabled>
                    knowledge: {student.knowledge}
                  </ListGroupItem>
                </ListGroup>
              )}
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>

      <EditStudentModal
        show={modalShow}
        onHide={handleOnHide}
        student={student}
      />
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

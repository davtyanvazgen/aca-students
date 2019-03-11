import React, { useState } from "react";
import EditStudentModal from "../../containers/editInfoStudent";
import { firestoreConnect, withFirestore } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserTimes, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import {
  ListGroupItem,
  Media,
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Container } from "react-bootstrap";

function StudentCard(props) {
  const { statuses, cources, student, firestore } = props;
  const [modalShow, setModalShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [isOpenCource, setIsOpenCource] = useState(false);

  const [collapse, setcollapse] = useState(false);
  // this.toggle = this.toggle.bind(this);
  // this.state = { collapse: false };

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
      <ListGroupItem>
        <Row>
          <Col xs="5" md="2">
            <Media
              style={{ width: "100%", borderRadius: "50%" }}
              object
              src="https://i.pinimg.com/originals/02/f3/87/02f38779c48e8880536a51c309227c8c.gif"
              alt="Generic placeholder image"
            />
          </Col>

          <Col xs="6" md="5" style={{ wordWrap: "break-word" }}>
            <p>{student.fullName.toUpperCase()}</p>
            <p>{student.date}</p>
          </Col>

          <Col xs="10" md="4">
            <Row>
              <ButtonDropdown
                style={{ width: "100%" }}
                isOpen={isOpenStatus}
                toggle={toggleStatus}
              >
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
            </Row>
            <Row>
              <ButtonDropdown
                style={{ width: "100%" }}
                isOpen={isOpenCource}
                toggle={toggleCource}
              >
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
            </Row>
          </Col>

          <Col xs="1">
            <Row>
              <Col xs="6">
                <FontAwesomeIcon icon="user-times" onClick={handleRemove} />
              </Col>

              <Col xs="6">
                <FontAwesomeIcon icon="user-edit" onClick={handleEdit} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row />
      </ListGroupItem>

      {/* <ListGroup>
        <ListGroupItem
          color="info"
          onClick={toggle}
          style={{ marginBottom: "1rem" }}
        >
          <Row style={{ border: "1px solid white" }}>
            <Col
              sm={{ size: 2 }}
              style={{ border: "1px solid red", paddingLeft: "0px" }}
            >
              <Media
                
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

              <Collapse isOpen={collapse}>
                <Card>
                  <CardBody>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident.
                  </CardBody>
                </Card>
              </Collapse>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>

      <EditStudentModal
        show={modalShow}
        onHide={handleOnHide}
        student={student}
      /> */}
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

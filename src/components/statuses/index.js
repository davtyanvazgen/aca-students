import React, { useState } from "react";
import "./style.css";
import Statuse from "./statuse";
import AddStatuseForm from "./addStatuseForm";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Col, Container, Row, Collapse, Button } from "reactstrap";

const AddStatuse = ({ statuses, students }) => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(!collapse);
  };

  return (
    <Container className="mainContainer">
      <Container>
        <Row>
          <Col className="center">
            <h1>Current statuses</h1>
            <Button
              id="addStatusButton"
              color="info"
              onClick={toggle}
              size="sm"
            >
              Add new status
            </Button>
          </Col>
        </Row>

        <Collapse isOpen={collapse}>
          <Row>
            <AddStatuseForm statuses={statuses} />
          </Row>
        </Collapse>
        <hr />
      </Container>

      <Container>
        <Row>
          {statuses ? (
            statuses
              .sort(function(a, b) {
                return a.sort - b.sort;
              })
              .map(statuse => (
                <Col xs="6" md="4" lg="3" key={statuse.id} className="martop">
                  <Statuse
                    key={statuse.id}
                    statuse={statuse}
                    students={students}
                    statuses={statuses}
                  />
                </Col>
              ))
          ) : (
            <div className="loader" />
          )}
        </Row>
      </Container>
    </Container>
  );
};

export default compose(
  firestoreConnect(() => ["statuses", "students"]),
  connect((state, props) => ({
    statuses: state.firestore.ordered.statuses,
    students: state.firestore.ordered.students
  }))
)(AddStatuse);

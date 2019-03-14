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
    <Container>
      <Container>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <h1>Current statuses</h1>
            <Button
              color="info"
              onClick={toggle}
              size="sm"
              style={{ float: "right" }}
            >
              Add new status
            </Button>
          </Col>
        </Row>

        <Collapse isOpen={collapse}>
          <Row style={{ marginTop: "15px " }}>
            <AddStatuseForm />
          </Row>
        </Collapse>
        <hr />
      </Container>

      <Container>
        <Row>
          {statuses ? (
            statuses.map(statuse => (
              <Col
                xs="6"
                md="4"
                lg="3"
                key={statuse.id}
                style={{ marginTop: "20px" }}
              >
                <Statuse
                  key={statuse.id}
                  statuse={statuse}
                  students={students}
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

import React, { useState } from "react";
import "./style.css";
import Cource from "./cource";
import AddCourceForm from "./addCourceForm";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Row, Col, Container, Collapse, Button } from "reactstrap";

const AddCource = props => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(!collapse);
  };

  return (
    <>
      <Container className="mainContainer">
        <Container>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <h1>Current cources</h1>
              <Button
                color="info"
                onClick={toggle}
                size="sm"
                style={{ float: "right" }}
              >
                Add new course
              </Button>
            </Col>
          </Row>

          <Row style={{ marginTop: "15px" }}>
            <Collapse isOpen={collapse} style={{ margin: "0 auto" }}>
              <Col style={{ minWidth: "440px" }}>
                <AddCourceForm />
              </Col>
            </Collapse>
          </Row>
          <hr />
        </Container>

        <Container style={{ marginTop: "15px" }}>
          <Row>
            {props.cources ? (
              props.cources.map(cource => (
                <Col
                  xs="6"
                  md="4"
                  lg="3"
                  key={cource.id}
                  style={{ marginTop: "20px" }}
                >
                  <Cource
                    key={cource.id}
                    cource={cource}
                    students={props.students}
                  />
                </Col>
              ))
            ) : (
              <div className="loader" />
            )}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default compose(
  firestoreConnect(() => ["cources", "students"]),
  connect((state, props) => ({
    cources: state.firestore.ordered.cources,
    students: state.firestore.ordered.students
  }))
)(AddCource);

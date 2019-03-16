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
            <Col className="centered">
              <h1>Current courses</h1>
              <Button
                id="addCourseButton"
                color="info"
                onClick={toggle}
                size="sm"
              >
                Add new course
              </Button>
            </Col>
          </Row>

          <Row>
            <Collapse isOpen={collapse} id="collapse">
              <Col id="collapseCol">
                <AddCourceForm cources={props.cources} />
              </Col>
            </Collapse>
          </Row>
          <hr />
        </Container>

        <Container className="martop">
          <Row>
            {props.cources ? (
              props.cources
                .sort(function(a, b) {
                  return a.sort - b.sort;
                })
                .map(cource => (
                  <Col xs="6" md="4" lg="3" key={cource.id} className="martop">
                    <Cource
                      key={cource.id}
                      cource={cource}
                      students={props.students}
                      cources={props.cources}
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

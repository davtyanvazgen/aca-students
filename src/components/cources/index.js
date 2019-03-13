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
      <Container>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <h1>Current cources</h1>
            <Button color="primary" onClick={toggle}>
              Add new cource
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

        <Row>
          {props.cources ? (
            props.cources.map(cource => (
              <Col xs="4">
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
      {/* <div id="containerForm">
        <div className="miniContainerForm">
          <AddCourceForm />
        </div>
      </div>
      <div className="courceList">
        <h1>Current cources</h1>
        {props.cources ? (
          props.cources.map(cource => (
            <Cource key={cource.id} cource={cource} students={props.students} />
          ))
        ) : (
          <div className="loader" />
        )}
      </div> */}
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

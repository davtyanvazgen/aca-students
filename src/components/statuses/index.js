import React, { Component } from "react";
import "./style.css";
import Statuse from "./statuse";
import AddStatuseForm from "./addStatuseForm";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Color from "./colors";
import {Col, Container, Row} from "reactstrap";

const AddStatuse = ({statuses, students}) => (
      <Container>
          <Row>
              <AddStatuseForm />
          </Row>
          <Row>
              <Row><h1>All statuses</h1></Row>
              <Row>
              {statuses &&
              statuses.map(statuse => (
                  <Col  key={statuse.id} xs="12" md="6" lg="4">
                  <Statuse
                      key={statuse.id}
                      statuse={statuse}
                      students={students}
                  />
                  </Col>
              ))}
              </Row>
          </Row>
      </Container>
        // <div id="containerFormStatuse">
        //   <div className="miniContainerFormStatuse">
        //     <AddStatuseForm />
        //   </div>
        // </div>
        // <Color />
        //
        // <div className="statuseList">
        //   <h1>All statuses</h1>
        //   {statuses &&
        //     statuses.map(statuse => (
        //       <Statuse
        //         key={statuse.id}
        //         statuse={statuse}
        //         students={students}
        //       />
        //     ))}
        // </div>

);

export default compose(
  firestoreConnect(() => ["statuses", "students"]),
  connect((state, props) => ({
    statuses: state.firestore.ordered.statuses,
    students: state.firestore.ordered.students
  }))
)(AddStatuse);

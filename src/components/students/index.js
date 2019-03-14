import React from "react";
import CourcesButton from "./courcesButtonGroup";
import StatusesButton from "./statusesButtonGroup";
import StudentCard from "./studentCard";
import Input from "reactstrap/es/Input";
import {
  Container,
  Row,
  Col,
  ListGroup,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

const Students = ({ filterStudents, searchValue, students, cources, statuses }) => {
  let background = "#ffffff";
  if(students && cources && statuses) {
      return (
          <>
              <Container>
                  <Row>
                      <Col sm={{size: 10, offset: 2}} style={{paddingRight:"0px", paddingLeft:"0px"}}>
                          <Container>
                              <Row>
                                  <Col>
                                      <InputGroup
                                          style={{
                                              maxWidth: "300px",
                                              margin: "10px 0 0 auto"
                                          }}
                                      >
                                          <Input
                                              value={searchValue}
                                              onChange={e => filterStudents(e.target.value.toUpperCase())}
                                          />
                                          <InputGroupAddon addonType="append">Search</InputGroupAddon>
                                      </InputGroup>
                                  </Col>
                              </Row>

                              <Row>
                                  <Col style={{margin: "5px auto"}} xs="auto">
                                      <CourcesButton courceStudents={filterStudents}/>
                                  </Col>
                              </Row>
                          </Container>
                      </Col>
                  </Row>

                  <Row>
                      <Col xs={{size: 2}} style={{padding: "0px "}}>
                          <StatusesButton statuseStudents={filterStudents}/>
                      </Col>

                      <Col xs={{size: 10}}>
                          <Container>
                              <Row>
                                  <ListGroup style={{width: "100%"}}>
                                      {students &&
                                      students.map(student => {
                                          background === "#ffffff" ? background = "#fbfbfb" : background = "#ffffff";
                                          return (
                                              <StudentCard
                                                  background={background}
                                                  key={student.id}
                                                  student={student}
                                                  filterStudents={filterStudents}
                                              />
                                          )
                                      })}
                                  </ListGroup>
                              </Row>
                          </Container>
                      </Col>
                  </Row>
              </Container>
          </>
      )
  } else {
    return (
      <div className="lds-hourglass" />
    )
  }
};

export default Students;

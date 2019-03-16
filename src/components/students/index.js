import React from "react";
import CourcesButtonGroup from "./courcesButtonGroup";
import StatusesButton from "./statusesButtonGroup";
import StudentCard from "./studentCard";
import Input from "reactstrap/es/Input";
import "./style.css";
import {
  Container,
  Row,
  Col,
  ListGroup,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

const Students = ({
  filterStudents,
  searchValue,
  students,
  allStudents,
  cources,
  statuses
}) => {
  let background = "#ffffff";
  if (students && cources && statuses) {
    return (
      <>
        <Container className="mainContainer">
          <Row>
            <Col sm={{ size: 10, offset: 2 }} className="column">
              <Container>
                <Row>
                  <Col>
                    <h5 className="count">
                      All students count: <strong>{allStudents.length}</strong>
                    </h5>
                  </Col>
                  <Col>
                    <InputGroup className="searchInput">
                      <Input
                        value={searchValue}
                        onChange={e =>
                          filterStudents(e.target.value.toUpperCase())
                        }
                      />
                      <InputGroupAddon addonType="append">
                        Search
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className="buttonsCol" xs="auto">
                    <CourcesButtonGroup courceStudents={filterStudents} />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>

          <Row>
            <Col xs={{ size: 2 }} className="colpadding">
              <StatusesButton statuseStudents={filterStudents} />
            </Col>

            <Col xs={{ size: 10 }}>
              <Container>
                <Row>
                  <ListGroup className="listGroup">
                    {students &&
                      students.map(student => {
                        background === "#ffffff"
                          ? (background = "#fbfbfb")
                          : (background = "#ffffff");
                        return (
                          <StudentCard
                            background={background}
                            key={student.id}
                            student={student}
                            filterStudents={filterStudents}
                          />
                        );
                      })}
                  </ListGroup>
                  <div className="listGroup">
                    {!students.length && (
                      <div>
                        <div className="jumbotron">
                          <Container>
                            <Row>
                              <ListGroup className="listGroup">
                                {students &&
                                  students.map(student => {
                                    background === "#ffffff"
                                      ? (background = "#fbfbfb")
                                      : (background = "#ffffff");
                                    return (
                                      <StudentCard
                                        background={background}
                                        key={student.id}
                                        student={student}
                                        filterStudents={filterStudents}
                                      />
                                    );
                                  })}
                              </ListGroup>
                              <div className="listGroup">
                                {!students.length && (
                                  <div>
                                    <div className="jumbotron">
                                      <Container>
                                        <h1> No students</h1>
                                        <p>There is no student at this time.</p>
                                      </Container>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </Row>
                          </Container>
                        </div>
                      </div>
                    )}
                  </div>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container className="mainContainer">
          <div className="lds-hourglass" />
        </Container>
      </>
    );
  }
};

export default Students;

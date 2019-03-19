import React, { useState } from "react";
import CoursesButtonGroup from "./coursesButtonGroup";
import StatusesButton from "./statusesButtonGroup";
import StudentCard from "./studentCard";
import Input from "reactstrap/es/Input";
import "../styles/studentsList.css";
import {
  Container,
  Row,
  Col,
  ListGroup,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Students = ({
  filterStudents,
  searchValue,
  students,
  allStudents,
  courses,
  statuses,
  background
}) => {
  const [page, setPage] = useState(1);

  const pages = [];

  function onPageClick(p) {
    setPage(p);
  }
  if (students && courses && statuses) {
    for (let i = 0; i < Math.ceil(students.length / 10); i++) {
      pages.push(i);
    }
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
                    <CoursesButtonGroup courseStudents={filterStudents} />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>

          <Row>
            <Col xs={{ size: 2 }} className="colpadding">
              <StatusesButton statusStudents={filterStudents} />
            </Col>

            <Col xs={{ size: 10 }}>
              <Container>
                <Row>
                  <ListGroup className="listGroup">
                    {students &&
                      students.map((student, i) => {
                        background === "#ffffff"
                          ? (background = "#fbfbfb")
                          : (background = "#ffffff");
                        if (i < page * 10 && i >= (page - 1) * 10) {
                          return (
                            <StudentCard
                              background={background}
                              key={student.id}
                              student={student}
                              filterStudents={filterStudents}
                            />
                          );
                        }
                      })}
                  </ListGroup>
                  {students && students.length > 10 && (
                    <Row>
                      <FontAwesomeIcon icon="arrow-left" />
                      {pages.map(p => (
                        <div key={p} onClick={() => onPageClick(p + 1)}>
                          {p + 1}
                        </div>
                      ))}
                      <FontAwesomeIcon icon="arrow-right" />
                    </Row>
                  )}
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
library.add(faArrowLeft, faArrowRight);

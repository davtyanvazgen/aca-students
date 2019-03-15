import React from "react";
import CourcesButton from "./courcesButtonGroup";
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
            <Col
              sm={{ size: 10, offset: 2 }}
              style={{ paddingRight: "0px", paddingLeft: "0px" }}
            >
              <Container>
                <Row>
                  <Col>
                    <p style={{ marginTop: "8px" }}>
                      {" "}
                      All students count: {allStudents.length}. (c) Lodash
                    </p>
                  </Col>
                  <Col>
                    <InputGroup
                      style={{
                        maxWidth: "300px",
                        margin: "10px 0 0 auto"
                      }}
                    >
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
                  <Col style={{ margin: "5px auto" }} xs="auto">
                    <CourcesButton courceStudents={filterStudents} />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>

          <Row>
            <Col xs={{ size: 2 }} style={{ padding: "0px " }}>
              <StatusesButton statuseStudents={filterStudents} />
            </Col>

            <Col xs={{ size: 10 }}>
              <Container>
                <Row>
                  <ListGroup style={{ width: "100%" }}>
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
                  <div style={{ width: "100%" }}>
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
    return <div className="lds-hourglass" />;
  }
};

export default Students;

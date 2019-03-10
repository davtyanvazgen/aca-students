import React from "react";
import CourcesButton from "./courcesButtonGroup";
import StatusesButton from "./statusesButtonGroup";
import StudentCard from "./studentCard";
import Input from "reactstrap/es/Input";
import { Container, Row, Col } from "reactstrap";

const Students = ({ filterStudents, searchValue, students }) => (
  <>
    <Container>
      <Row style={{ border: "2px solid red" }}>
        <Col style={{ border: "2px solid black" }} sm={{ size: 10, offset: 2 }}>
          <CourcesButton courceStudents={filterStudents} />
          <Input
            value={searchValue}
            onChange={e => filterStudents(e.target.value.toUpperCase())}
          />
        </Col>
      </Row>

      <Row style={{ border: "2px solid yellow" }}>
        <Col sm={{ size: 2 }} style={{ border: "2px solid green" }}>
          <StatusesButton statuseStudents={filterStudents} />
        </Col>

        <Col sm={{ size: 10 }} style={{ border: "2px solid green" }}>
          {students &&
            students.map(student => (
              <StudentCard
                key={student.id}
                student={student}
                filterStudents={filterStudents}
              />
            ))}
        </Col>
      </Row>
    </Container>
  </>
);

export default Students;

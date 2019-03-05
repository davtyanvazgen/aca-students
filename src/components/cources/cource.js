import React from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";

export default function Cource(props) {
  const { cource, students } = props;

  const handleRemove = cource => {
    let studentsCount = 0;
    let studentsForDelete = [];

    students.map(student => {
      if (student.cource === cource.id) {
        studentsCount = studentsCount + 1;
        studentsForDelete.push(student);
      }
    });

    props.removeCource(cource);

    studentsForDelete.map(student => {
      props.removeStudent(student);
    });

    console.log(studentsCount, studentsForDelete);
  };

  return (
    <div>
      <ListGroup>
        <ListGroupItem key={cource.id} color="success">
          {cource.name}
          <Button
            className="float-right"
            size="sm"
            color="danger"
            onClick={() => {
              handleRemove(cource);
            }}
          >
            Delete
          </Button>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}

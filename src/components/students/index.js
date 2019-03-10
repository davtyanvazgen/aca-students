import React from "react";
import CourcesButton from "./courcesButtonGroup"
import StatusesButton from "./statusesButtonGroup"
import StudentCard from "./studentCard";
import Input from "reactstrap/es/Input";

const Students = ({filterStudents, searchValue, students}) => (
    <div className="container border border-primary">
      <div className="row">
        <div className="col-12 border border-primary">
          <CourcesButton
              courceStudents = { filterStudents }
          />
          <Input onChange={(e) => filterStudents(e.target.value)} value={searchValue}></Input>
        </div>
      </div>
      <div className="row">
        <div className="col-2 border border-primary">
          <StatusesButton
              statuseStudents = { filterStudents }
          />
        </div>
        <div className="col-10 row container border border-primary">
          {students && students.map(student => (
              <StudentCard
                  key={ student.id }
                  student= { student }
                  filterStudents = {filterStudents}
              />))
          }
        </div>
      </div>
    </div>
);

export default Students;
import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Badge, Button } from "reactstrap";

const CourcesButton = ({
  selectedCources,
  cources,
  courceStudents,
  students
}) => {
  const [rSelected, setSelected] = useState([...selectedCources]);
  function onCheckboxBtnClick(selected) {
    let tempArr = rSelected;
    const index = tempArr.indexOf(selected);
    if (index < 0) {
      tempArr.push(selected);
    } else {
      tempArr.splice(index, 1);
    }
    setSelected(tempArr);
  }

  function studentSameCource(cource) {
    let counter = 0;
    students.forEach(student => {
      if (student.cource === cource.id) {
        counter++;
      }
    });
    return counter;
  }
  return (
    <div className="buttons">
      {cources &&
        cources
          .sort(function(a, b) {
            return a.sort - b.sort;
          })
          .map(cource => (
            <Button
              className="activeButtonColor courseButton"
              style={{
                backgroundColor: cource.color,
                borderColor: cource.color
              }}
              id={cource.id}
              key={cource.id}
              onClick={() => {
                onCheckboxBtnClick(cource.id);
                courceStudents(undefined, cource);
              }}
              active={rSelected.includes(cource.id)}
            >
              <span>
                {cource.name}
                <Badge className="badge" color="secondary">
                  {students && studentSameCource(cource)}
                </Badge>
              </span>
            </Button>
          ))}
    </div>
  );
};

export default compose(
  firestoreConnect(() => ["cources", "students"]),
  connect((state, props) => ({
    students: state.firestore.ordered.students,
    cources: state.firestore.ordered.cources,
    selectedCources: state.filter.selectedCources
  }))
)(CourcesButton);

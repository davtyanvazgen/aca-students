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
    <div style={{ width: "100%", overflow: " auto ", display: "flex" }}>
      {cources &&
        cources
          .sort(function(a, b) {
            return a.sort - b.sort;
          })
          .map(cource => (
            <Button
              className="activeButtonColor"
              style={{
                margin: "3px 1px 8px 2px",
                backgroundColor: cource.color,
                borderColor: cource.color,
                whiteSpace: "nowrap",
                textAlign: "center"
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
                <Badge color="secondary" style={{ marginLeft: "4px" }}>
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

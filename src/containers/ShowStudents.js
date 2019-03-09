import { connect } from "react-redux";
import Students from "./Students";
import { visibilityFilters } from "../store/actions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const getShowStudents = (students, filter, selectedCources, selectedStatuses) => {
  let filters = selectedStatuses.length ? [...selectedCources,selectedStatuses[0]] : [...selectedCources];
  switch (filter) {
    case visibilityFilters.SHOW_ALL:
      return students;
    case visibilityFilters.SHOW_WITH_STATUS:
      return students.filter(
        student => filters.indexOf(student.status) !== -1
      );
    case visibilityFilters.SHOW_WITH_COURCES:
      return students.filter(
        student => filters.indexOf(student.cource) !== -1
      );
    case visibilityFilters.SHOW_WITH_COURCES_AND_STATUS:
      return students.filter(
        student =>
            filters.indexOf(student.status) !== -1 &&
            filters.indexOf(student.cource) !== -1
      );
    default:
      throw new Error("Unknown filter " + filter);
  }
};

const searchStudents = (students, searchValue) => {
  if(students) {
    if(!searchValue.length){
      return students;
    }
    let resultArr = [];
    console.log(students);
    for (let i = 0; i < students.length; i++) {
      let counter = 0;
      for (let j = 0; j < searchValue.length; j++) {
        if (students[i].fullName[j] === searchValue[j]) {
          counter++;
        }
      }
      if (counter === searchValue.length) {
        resultArr.push(students[i]);
      }
    }
    return resultArr;
  }
}

export default compose(
  firestoreConnect(() => ["students"]),
  connect((state, props) => ({
    selectedStatuses: state.filter.selectedStatuses,
    selectedCources: state.filter.selectedCources,
    searchValue: state.filter.searchValue,
    students: searchStudents(getShowStudents(
        state.firestore.ordered.students,
        state.filter.filter,
        state.filter.selectedCources,
        state.filter.selectedStatuses
    ), state.filter.searchValue)
  }))
)(Students);

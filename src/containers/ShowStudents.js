import { connect } from "react-redux";
import Students from "./Students";
import { visibilityFilters } from "../store/actions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const getShowStudents = (students, filter, filterArray) => {
  console.log("hihihihi");
  switch (filter) {
    case visibilityFilters.SHOW_ALL:
      return students;
    case visibilityFilters.SHOW_WITH_STATUS:
      return students.filter(
        student => filterArray.indexOf(student.status) !== -1
      );
    case visibilityFilters.SHOW_WITH_COURCES:
      return students.filter(
        student => filterArray.indexOf(student.cource) !== -1
      );
    case visibilityFilters.SHOW_WITH_COURCES_AND_STATUS:
      return students.filter(
        student =>
          filterArray.indexOf(student.status) !== -1 &&
          filterArray.indexOf(student.cource) !== -1
      );
    default:
      throw new Error("Unknown filter " + filter);
  }
};

export default compose(
  firestoreConnect(() => ["students"]), // or { collection: 'todos' }
  connect((state, props) => ({
    students: getShowStudents(
      state.firestore.ordered.students,
      state.filter.filter,
      state.filter.filterArray
    )
  }))
)(Students);

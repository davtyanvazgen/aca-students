import { connect } from "react-redux";
import Students from "../components/students/index";
import { visibilityFilters } from "../store/actions";
import { setFilter } from "../store/actions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const getShowStudents = (
  students,
  filter,
  selectedCources,
  selectedStatuses
) => {
  let filters = selectedStatuses.length
    ? [...selectedCources, selectedStatuses[0]]
    : [...selectedCources];
  switch (filter) {
    case visibilityFilters.SHOW_ALL:
      return students;
    case visibilityFilters.SHOW_WITH_STATUS:
      return students.filter(student => filters.indexOf(student.status) !== -1);
    case visibilityFilters.SHOW_WITH_COURCES:
      return students.filter(student => filters.indexOf(student.cource) !== -1);
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
  if (students) {
    if (!searchValue.length) {
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
};

const filter = (searchValue, selectedCources, selectedStatuses, dispatch) => {
  return function(value = searchValue, cource = "", status = "") {
    if (cource !== "") {
      if (selectedCources.indexOf(cource.id) === -1 && cource) {
        selectedCources.push(cource.id);
      } else {
        selectedCources.splice(selectedCources.indexOf(cource.id), 1);
      }
    }

    if (status !== "") {
      if (status.name && status !== "all") {
        if (selectedStatuses.length) {
          selectedStatuses.pop();
        }
        selectedStatuses.push(status.id);
      } else {
        selectedStatuses.pop();
      }
    }

    if (!selectedStatuses.length && selectedCources.length) {
      dispatch(
        setFilter(
          visibilityFilters.SHOW_WITH_COURCES,
          selectedStatuses,
          selectedCources,
          value
        )
      );
    }
    if (selectedStatuses.length && !selectedCources.length) {
      dispatch(
        setFilter(
          visibilityFilters.SHOW_WITH_STATUS,
          selectedStatuses,
          selectedCources,
          value
        )
      );
    }
    if (selectedStatuses.length && selectedCources.length) {
      dispatch(
        setFilter(
          visibilityFilters.SHOW_WITH_COURCES_AND_STATUS,
          selectedStatuses,
          selectedCources,
          value
        )
      );
    }
    if (!selectedStatuses.length && !selectedCources.length) {
      dispatch(
        setFilter(
          visibilityFilters.SHOW_ALL,
          selectedStatuses,
          selectedCources,
          value
        )
      );
    }
  };
};

export default compose(
  firestoreConnect(() => ["students"]),
  connect((state, props) => ({
    searchValue: state.filter.searchValue,
    filterStudents: filter(
      state.filter.searchValue,
      state.filter.selectedCources,
      state.filter.selectedStatuses,
      props.dispatch
    ),
    students: searchStudents(
      getShowStudents(
        state.firestore.ordered.students,
        state.filter.filter,
        state.filter.selectedCources,
        state.filter.selectedStatuses
      ),
      state.filter.searchValue
    )
  }))
)(Students);

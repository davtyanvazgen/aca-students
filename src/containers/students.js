import { connect } from "react-redux";
import Students from "../components/students/index";
import { visibilityFilters } from "../store/actions";
import { setFilter } from "../store/actions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const getShowStudents = (
  students,
  filter,
  selectedCourses,
  selectedStatuses
) => {
  let filters = selectedStatuses.length
    ? [...selectedCourses, selectedStatuses[0]]
    : [...selectedCourses];
  switch (filter) {
    case visibilityFilters.SHOW_ALL:
      return students;
    case visibilityFilters.SHOW_WITH_STATUS:
      return students.filter(student => filters.indexOf(student.status) !== -1);
    case visibilityFilters.SHOW_WITH_COURSES:
      return students.filter(student => filters.indexOf(student.course) !== -1);
    case visibilityFilters.SHOW_WITH_COURSES_AND_STATUS:
      return students.filter(
        student =>
          filters.indexOf(student.status) !== -1 &&
          filters.indexOf(student.course) !== -1
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

const filter = (searchValue, selectedCourses, selectedStatuses, dispatch) => {
  return function(value = searchValue, course = "", status = "") {
    if (course !== "") {
      if (selectedCourses.indexOf(course.id) === -1 && course) {
        selectedCourses.push(course.id);
      } else {
        selectedCourses.splice(selectedCourses.indexOf(course.id), 1);
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

    if (!selectedStatuses.length && selectedCourses.length) {
      dispatch(
        setFilter(
          visibilityFilters.SHOW_WITH_COURSES,
          selectedStatuses,
          selectedCourses,
          value
        )
      );
    }
    if (selectedStatuses.length && !selectedCourses.length) {
      dispatch(
        setFilter(
          visibilityFilters.SHOW_WITH_STATUS,
          selectedStatuses,
          selectedCourses,
          value
        )
      );
    }
    if (selectedStatuses.length && selectedCourses.length) {
      dispatch(
        setFilter(
          visibilityFilters.SHOW_WITH_COURSES_AND_STATUS,
          selectedStatuses,
          selectedCourses,
          value
        )
      );
    }
    if (!selectedStatuses.length && !selectedCourses.length) {
      dispatch(
        setFilter(
          visibilityFilters.SHOW_ALL,
          selectedStatuses,
          selectedCourses,
          value
        )
      );
    }
  };
};

export default compose(
  firestoreConnect(() => [
    { collection: "students", orderBy: "date" },
    { collection: "courses", orderBy: "sort" },
    { collection: "statuses", orderBy: "sort" }
  ]),
  connect((state, props) => ({
    searchValue: state.filter.searchValue,
    filterStudents: filter(
      state.filter.searchValue,
      state.filter.selectedCourses,
      state.filter.selectedStatuses,
      props.dispatch
    ),
    students: searchStudents(
      getShowStudents(
        state.firestore.ordered.students,
        state.filter.filter,
        state.filter.selectedCourses,
        state.filter.selectedStatuses
      ),
      state.filter.searchValue
    ),
    courses: state.firestore.ordered.courses,
    statuses: state.firestore.ordered.statuses,
    allStudents: state.firestore.ordered.students,
    background: "#ffffff"
  }))
)(Students);

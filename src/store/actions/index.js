export const setFilter = (
  filter,
  selectedStatuses,
  selectedCourses,
  searchValue
) => ({
  type: "SET_VISIBILITY_FILTER",
  filter,
  selectedStatuses,
  selectedCourses,
  searchValue
});

export const visibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_WITH_STATUS: "SHOW_WITH_STATUS",
  SHOW_WITH_COURSES: "SHOW_WITH_COURSES",
  SHOW_WITH_COURSES_AND_STATUS: "SHOW_WITH_COURSES_AND_STATUS"
};

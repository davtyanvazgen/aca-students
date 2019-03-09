export const setFilter = (filter, filterArray, searchValue) => ({
  type: "SET_VISIBILITY_FILTER",
  filter,
  filterArray,
  searchValue
});

export const visibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_WITH_STATUS: "SHOW_WITH_STATUS",
  SHOW_WITH_COURCES: "SHOW_WITH_COURCES",
  SHOW_WITH_COURCES_AND_STATUS: "SHOW_WITH_COURCES_AND_STATUS"
};

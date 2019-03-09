import { visibilityFilters } from "../actions";

const filterReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      // console.log(action.filter, action.filterArray);
      return { filter: action.filter, selectedStatuses: action.selectedStatuses, selectedCources: action.selectedCources, searchValue: action.searchValue };
    default:
      return {
        filter: state.filter || visibilityFilters.SHOW_ALL,
        selectedStatuses: state.selectedStatuses || [],
        selectedCources: state.selectedCources || [],
        searchValue: state.searchValue || "",
      };
  }
};

export default filterReducer;

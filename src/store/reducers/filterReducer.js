import { visibilityFilters } from "../actions";

const filterReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      // console.log(action.filter, action.filterArray);
      return { filter: action.filter, filterArray: action.filterArray };
    default:
      return {
        filter: state.filter || visibilityFilters.SHOW_ALL,
        filterArray: state.filterArray || []
      };
  }
};

export default filterReducer;

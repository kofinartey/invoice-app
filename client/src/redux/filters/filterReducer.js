//types
const TOGGLE_FILTER = "TOGGLE_FILTER";

export const toggleFilter = (selectedFilter) => {
  return {
    type: TOGGLE_FILTER,
    payload: selectedFilter,
  };
};

const initialState = {
  draft: false,
  pending: false,
  paid: false,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FILTER:
      return {
        draft: false,
        pending: false,
        paid: false,
        [action.payload]: !state[action.payload],
      };
    default:
      return state;
  }
};

export default filterReducer;

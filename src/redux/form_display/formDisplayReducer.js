import { SHOW_FORM } from "./formDisplayTypes";
const initialState = false;

const formDisplayReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FORM:
      return !state;
    default:
      return state;
  }
};

export default formDisplayReducer;

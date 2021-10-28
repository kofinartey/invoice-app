import {
  HIDE_FORM,
  TOGGLE_NEW_FORM,
  TOGGLE_EDIT_FORM,
} from "./formDisplayTypes";
const initialState = {
  new: false,
  edit: false,
};

const formDisplayReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NEW_FORM:
      return {
        new: true,
        edit: false,
      };
    case TOGGLE_EDIT_FORM:
      return {
        new: false,
        edit: true,
      };
    case HIDE_FORM:
      return initialState;
    default:
      return state;
  }
};

export default formDisplayReducer;

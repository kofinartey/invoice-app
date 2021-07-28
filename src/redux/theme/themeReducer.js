import { SWITCH_THEME } from "./themeTypes";
const initialState = false;

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      return !state;
    default:
      return state;
  }
};

export default themeReducer;

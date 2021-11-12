import { SWITCH_THEME } from "./themeTypes";
// const initialState = false;
const initialState = JSON.parse(localStorage.getItem("userInfo"))
  ? JSON.parse(localStorage.getItem("userInfo")).settings.darkTheme
  : false;

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      const currentInfo = JSON.parse(localStorage.getItem("userInfo"));
      const alteredInfo = {
        ...currentInfo,
        settings: {
          ...currentInfo.settings,
          darkTheme: action.payload,
        },
      };
      localStorage.setItem("userInfo", JSON.stringify(alteredInfo));

      return action.payload;
    default:
      return state;
  }
};

export default themeReducer;

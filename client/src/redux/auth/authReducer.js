import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  USER_LOGOUT,
} from "./authTypes";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
  loading: false,
  error: "",
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTH_SUCCESS:
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case USER_LOGOUT:
      localStorage.clear();
      return initialState;
    default:
      return state;
  }
};

export default userReducer;

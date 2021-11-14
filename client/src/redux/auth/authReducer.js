import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  USER_LOGOUT,
  EDIT_USER_INFO,
  CHANGE_CURRENCY,
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
      console.log("AUTH SUCCESS called");
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
    case EDIT_USER_INFO:
      const editedInfo = {
        ...state,
        userInfo: {
          ...state.userInfo,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
        },
      };
      localStorage.setItem("userInfo", JSON.stringify(editedInfo.userInfo));
      return editedInfo;
    case CHANGE_CURRENCY:
      const editedCurrency = {
        ...state,
        userInfo: {
          ...state.userInfo,
          settings: {
            ...state.userInfo.settings,
            currency: action.payload,
          },
        },
      };
      localStorage.setItem("userInfo", JSON.stringify(editedCurrency.userInfo));
      return editedCurrency;
    default:
      return state;
  }
};

export default userReducer;

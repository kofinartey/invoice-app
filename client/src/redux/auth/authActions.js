import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  USER_LOGOUT,
} from "./authTypes";

export const authRequest = () => ({ type: AUTH_REQUEST });
export const authSucess = (data) => ({ type: AUTH_SUCCESS, payload: data });
export const authFailure = (error) => ({ type: AUTH_FAILURE, payload: error });
export const userLogout = () => ({ type: USER_LOGOUT });

export const signUp = (formData, history) => async (dispatch) => {
  try {
    dispatch(authRequest());
    const response = await fetch("http://localhost:5000/api/users/sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    dispatch(authSucess(data));
    history.push("/main");
  } catch (error) {
    dispatch(authFailure());
    console.log(error);
    console.log("Sign up failed");
  }
};

export const login = (formData, history) => async (dispatch) => {
  try {
    dispatch(authRequest());
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(response);
    const data = await response.json();
    if (response.ok) {
      dispatch(authSucess(data));
      history.push("/main");
    } else {
      dispatch(authFailure(data));
    }
    // dispatch(authSucess(data));
  } catch (error) {
    dispatch(authFailure(error));
  }
};

export const logout = (history) => async (dispatch) => {
  dispatch(userLogout());
  history.push("/");
};

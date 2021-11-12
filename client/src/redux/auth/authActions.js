import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  USER_LOGOUT,
  EDIT_USER_INFO,
  CHANGE_CURRENCY,
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
    history.push("/");
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

export const editUserInfo = (userInfo) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const response = await fetch(
      "http://localhost:5000/api/users/edit_user_info",
      {
        method: "PUT",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      }
    );
    const data = await response.json();
    dispatch({ type: EDIT_USER_INFO, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const changeCurrency = (currency) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const response = await fetch(
      "http://localhost:5000/api/users/change_currency",
      {
        method: "PATCH",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currency }),
        // body: currency,
      }
    );
    const data = await response.json();
    console.log(data);
    dispatch({ type: CHANGE_CURRENCY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (history) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const response = await fetch(
      "http://localhost:5000/api/users/delete_user",
      {
        method: "DELETE",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      history.push("/");
      localStorage.clear();
    }
  } catch (error) {}
};

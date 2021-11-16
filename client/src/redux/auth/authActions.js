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
      console.log(data);
      dispatch(authFailure(data));
    }
    // dispatch(authSucess(data));
  } catch (error) {
    // dispatch(authFailure(error.message));
    console.log(error.message);
  }
};

export const logout = (history) => async (dispatch) => {
  dispatch(userLogout());
  history.push("/");
};

export const changePassword =
  (formData, setChangingStatus, reset) => async (dispatch) => {
    try {
      setChangingStatus({
        visble: true,
        loading: true,
        message: "loading",
      });
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      const response = await fetch(
        "http://localhost:5000/api/users/change_password",
        {
          method: "PATCH",
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setChangingStatus({
          loading: false,
          visible: true,
          message: "Password changed",
        });
        setTimeout(() => {
          setChangingStatus({
            loading: false,
            visible: false,
            message: "",
          });
        }, 2000);
        reset({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setChangingStatus({
          loading: false,
          visible: true,
          message: "Failed to change password",
        });
        setTimeout(() => {
          setChangingStatus({
            loading: false,
            visible: false,
            message: "",
          });
        }, 1000);
      }
      // reset();
      // console.log(reset);
    } catch (error) {
      console.error(error);
    }
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

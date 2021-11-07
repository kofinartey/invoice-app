import { SWITCH_THEME } from "./themeTypes";

export const switchTheme = () => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const response = await fetch("http://localhost:5000/api/users/theme", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    const data = await response.json();
    console.log(data);
    dispatch({ type: SWITCH_THEME, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

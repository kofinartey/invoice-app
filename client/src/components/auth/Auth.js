import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
//my imports
import { login } from "../../redux/auth/authActions";
import SignUp from "./SignUp";
import Login from "./Login";
import AuthStyles from "./AuthStyles";
import { Divider } from "@material-ui/core";

function Auth() {
  const classes = AuthStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  // const user = useSelector((state) => state.user);
  const [isSignUp, setIsSignUp] = useState(false);

  const changeForm = () => {
    setIsSignUp(!isSignUp);
  };
  console.log(process.env);
  const trialLogin = (event) => {
    event.preventDefault();
    dispatch(
      login(
        {
          email: process.env.REACT_APP_GUEST_EMAIL,
          password: process.env.REACT_APP_GUEST_PASS,
        },
        history
      )
    );
  };

  return (
    <div className={classes.Auth}>
      <div className={classes.wrapper}>
        {isSignUp ? (
          <SignUp changeForm={changeForm} />
        ) : (
          <Login changeForm={changeForm} />
        )}
        <Divider />
        <div className={classes.trial}>
          <p>Don't want to be bothered?</p>
          <button className={`${classes.button} `} onClick={trialLogin}>
            Use trial account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;

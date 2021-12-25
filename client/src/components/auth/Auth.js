import React, { useState } from "react";
// import { useSelector } from "react-redux";
//my imports
import SignUp from "./SignUp";
import Login from "./Login";
import AuthStyles from "./AuthStyles";
import { Divider } from "@material-ui/core";

function Auth() {
  const classes = AuthStyles();
  // const user = useSelector((state) => state.user);
  const [isSignUp, setIsSignUp] = useState(false);

  const changeForm = () => {
    setIsSignUp(!isSignUp);
  };

  const trialLogin = (event) => {
    event.preventDefault();
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

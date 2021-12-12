import React, { useState } from "react";
// import { useSelector } from "react-redux";
//my imports
import SignUp from "./SignUp";
import Login from "./Login";
import AuthStyles from "./AuthStyles";

function Auth() {
  const classes = AuthStyles();
  // const user = useSelector((state) => state.user);
  const [isSignUp, setIsSignUp] = useState(false);

  const changeForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={classes.Auth}>
      {isSignUp ? (
        <SignUp changeForm={changeForm} />
      ) : (
        <Login changeForm={changeForm} />
      )}
    </div>
  );
}

export default Auth;

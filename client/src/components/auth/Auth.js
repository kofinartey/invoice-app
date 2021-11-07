import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//my imports
import SignUp from "./SignUp";
import Login from "./Login";
import AuthStyles from "./AuthStyles";

const signUpSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("can't be empty"),
  password: yup.string().min(8).max(255).required("can't be empty"),
  name: yup.string().required("can't be empty"),
});
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("can't be empty"),
  password: yup.string().min(8).max(255).required("can't be empty"),
});

function Auth() {
  const classes = AuthStyles();
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
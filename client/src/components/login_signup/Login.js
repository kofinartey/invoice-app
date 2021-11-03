import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

import LoginStyles from "./LoginStyles";
import Input from "../shared_components/Input";

const schema = yup.object().shape({
  email: yup.string().email("invalid email").required("can't be empty"),
  password: yup.string().min(8).max(255).required("can't be empty"),
});

function Login() {
  const classes = LoginStyles();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitLogin = (data) => {};

  return (
    <div className={classes.Login}>
      <form className={classes.form} onSubmit={handleSubmit(submitLogin)}>
        <Input
          type="email"
          inputid="email"
          placeholder="E-mail"
          {...register("email")}
          errors={errors.email?.message}
        />
        <Input
          type="password"
          placeholder="Password"
          inputid="password"
          {...register("password")}
          errors={errors.password?.message}
        />
        <button className={classes.button}>LOGIN</button>
        <div className={classes.switch}>
          <p>
            Don't have an account?
            <Link to="/signup" className={classes.switch__link}>
              Sign Up
            </Link>
            here
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;

import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

import LoginStyles from "./LoginStyles";
import Input from "../shared_components/Input";
const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email("invalid email").required("can't be empty"),
  password: yup.string().min(8).max(255).required("can't be empty"),
});

function SignUp() {
  const classes = LoginStyles();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const emailRef = useRef(null);

  const createUser = async () => {
    const response = fetch("http://localhost:5000/api/users", {
      method: "POST",
    });
  };
  const submitSignup = (data) => {};

  return (
    <div className={classes.Login}>
      <form className={classes.form} onSubmit={handleSubmit(submitSignup)}>
        <Input
          type="text"
          inputid="name"
          placeholder="Name"
          {...register("name")}
          errors={errors.name?.message}
        />
        <Input
          type="email"
          ref={emailRef}
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
        <button className={classes.button}>SIGN UP</button>

        <div className={classes.switch}>
          <p>
            Already have an account?
            <Link to="/login" className={classes.switch__link}>
              Login
            </Link>
            here
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;

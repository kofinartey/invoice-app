import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//my imports
import AuthStyles from "./AuthStyles";
import { signUp } from "../../redux/auth/authActions";
// import Input from "../shared_components/Input";

const signupSchema = yup.object().shape({
  name: yup.string().required("can't be empty"),
  email: yup.string().email("invalid email").required("can't be empty"),
  password: yup.string().min(8).max(255).required("can't be empty"),
});

function SignUp({ changeForm }) {
  const classes = AuthStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });
  const switchForm = () => {
    changeForm();
    reset();
  };
  const submit = (data) => {
    dispatch(signUp(data, history));
    reset();
  };

  return (
    <div className={classes.Auth}>
      <form className={classes.form} onSubmit={handleSubmit(submit)}>
        <>
          <p>{errors.name?.message}</p>
          <input type="text" placeholder="Name" {...register("name")} />
          <p>{errors.email?.message}</p>
          <input type="email" placeholder="Email" {...register("email")} />
          <p>{errors.password?.message}</p>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {/* <Input
            type="text"
            inputid="name"
            placeholder="Name"
            {...register("name")}
            errors={errors.name?.message}
          />
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
          /> */}
        </>
        <button className={classes.button}>SIGN UP</button>
        <div className={classes.switch}>
          <p>
            Already have an account? <span onClick={switchForm}>Login</span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;

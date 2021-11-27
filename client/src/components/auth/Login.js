import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//my imports
import { login } from "../../redux/auth/authActions";
import { CircularProgress } from "@mui/material";
import AuthStyles from "./AuthStyles";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("can't be empty"),
  password: yup.string().min(8).max(255).required("can't be empty"),
});

function Login({ changeForm, values }) {
  const classes = AuthStyles();
  const dispatch = useDispatch();
  const fetchError = useSelector((state) => state.user.error);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const switchForm = () => {
    changeForm();
    reset();
  };
  const submit = (data) => {
    dispatch(login(data, history));
  };
  return (
    <form onSubmit={handleSubmit(submit)} className={classes.form}>
      {fetchError && <p style={{ color: "#EC5757" }}>{fetchError}</p>}
      <>
        <div className={classes.formControl}>
          <p className={classes.error}>{errors.email?.message}</p>
          <input
            type="text"
            className={classes.input}
            {...register("email")}
            placeholder="email"
          />
        </div>
        <div className={classes.formControl}>
          <p className={classes.error}>{errors.password?.message}</p>
          <input
            type="password"
            className={classes.input}
            {...register("password")}
            placeholder="password"
          />
        </div>
      </>
      <button className={classes.button}>LOGIN</button>
      <div className={classes.switch}>
        <p>
          Don't have an account? <span onClick={switchForm}> SignUp</span>
        </p>
      </div>
      <div className={classes.spinner}>
        {user.loading && (
          <CircularProgress
          // size="30" color="inherit"
          />
        )}
      </div>
    </form>
  );
}

export default Login;

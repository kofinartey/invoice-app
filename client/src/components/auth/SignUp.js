import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//my imports
import AuthStyles from "./AuthStyles";
import { signUp } from "../../redux/auth/authActions";

const signupSchema = yup.object().shape({
  firstName: yup.string().required("can't be empty"),
  lastName: yup.string().required("can't be empty"),
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
    <form className={classes.form} onSubmit={handleSubmit(submit)}>
      <>
        <div className={classes.formControl}>
          <p className={classes.error}>{errors.firstName?.message}</p>
          <input
            type="text"
            className={classes.input}
            placeholder="First Name"
            {...register("firstName")}
          />
        </div>
        <div className={classes.formControl}>
          <p className={classes.error}>{errors.lastName?.message}</p>
          <input
            type="text"
            className={classes.input}
            placeholder="Last Name"
            {...register("lastName")}
          />
        </div>
        <div className={classes.formControl}>
          <p className={classes.error}>{errors.email?.message}</p>
          <input
            type="email"
            className={classes.input}
            placeholder="Email"
            {...register("email")}
          />
        </div>
        <div className={classes.formControl}>
          <p className={classes.error}>{errors.password?.message}</p>
          <input
            type="password"
            className={classes.input}
            placeholder="Password"
            {...register("password")}
          />
        </div>
      </>
      <button className={classes.button}>SIGN UP</button>
      <div className={classes.switch}>
        <p>
          Already have an account? <span onClick={switchForm}>Login</span>
        </p>
      </div>
    </form>
  );
}

export default SignUp;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//my imports
import { changePassword } from "../../redux/auth/authActions";
import { passwordSchema } from "./settingsSchema";
import ChangePasswordStyles from "./ChangePasswordStyles";

const ChangePasswordForm = () => {
  const classes = ChangePasswordStyles();
  const darkTheme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });
  const [changingStatus, setChangingStatus] = useState({
    loading: false,
    message: "",
    visible: false,
  });

  const submitPassword = (data) => {
    dispatch(changePassword(data, setChangingStatus, reset));
  };
  return (
    <div className={classes.password}>
      <p>Change Password</p>
      <form onSubmit={handleSubmit(submitPassword)}>
        <div className={classes.formControl}>
          <p className={classes.error}>{errors.currentPassword?.message}</p>
          <label className={classes.label} htmlFor="currentPassword">
            Current Password
          </label>
          <input
            className={classes.input}
            type="password"
            id="currentPassword"
            {...register("currentPassword")}
          />
        </div>

        <div className={classes.formControl}>
          <p className={classes.error}>{errors.newPassword?.message}</p>
          <label className={classes.label} htmlFor="newPassword">
            New Password
          </label>
          <input
            type="password"
            className={classes.input}
            {...register("newPassword")}
          />
        </div>

        <div className={classes.formControl}>
          <p className={classes.error}>{errors.confirmPassword?.message}</p>
          <label className={classes.label} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            className={classes.input}
            {...register("confirmPassword")}
            errors={errors.confirmPassword && "Passwords don't match"}
          />
        </div>
        <p style={{ fontSize: "0.8rem", color: "#ec5757" }}>
          {changingStatus.visible && `*** ${changingStatus.message}`}
        </p>
        <button
          className={classes.button}
          style={{ backgroundColor: darkTheme && "#252945" }}
        >
          CHANGE PASSWORD
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;

import React from "react";
import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";

const Input = forwardRef((props, ref) => {
  const darkTheme = useSelector((state) => state.theme);
  const styles = makeStyles({
    formControl: {
      marginBottom: "1rem",
    },
    label: {
      fontSize: "0.75rem",
      color: darkTheme ? "white" : "#7E88C3",
      fontWeight: "500",
    },
    input: {
      outline: "none",
      width: "100%",
      minWidth: "1rem",
      flexGrow: "1",
      border: "2px solid #DFE3FA",
      borderRadius: "0.3rem",
      padding: "0.9rem",
      color: darkTheme && "white",
      backgroundColor: darkTheme && "#1E2139",
      borderColor: darkTheme && "#252945",
      marginTop: "0.75rem",

      "&:focus": {
        border: "2px solid #7C5DFA",
      },
    },
  });
  const classes = styles();
  return (
    <div className={classes.formControl}>
      <label className={classes.label} htmlFor={props.inputId}>
        {props.label}
      </label>
      <input
        {...props}
        className={classes.input}
        type={props.type}
        name={props.inputId}
        id={props.inputId}
        ref={ref}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
});

export default Input;

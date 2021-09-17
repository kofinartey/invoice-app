import React, { useState } from "react";
import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";

const Input = forwardRef((props, ref) => {
  const darkTheme = useSelector((state) => state.theme);
  const [passedValue, setPassedValue] = useState(props.value);
  const updateValue = (e) => {
    setPassedValue(e.target.value);
  };
  const styles = makeStyles({
    formControl: {
      marginBottom: "1rem",
      position: "relative",
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
      borderColor: props.errors ? "#EC5757" : darkTheme ? "#252945" : "#DFE3FA",
      marginTop: "0.75rem",

      "&:focus": {
        border: "2px solid #7C5DFA",
      },
    },
    errors: {
      color: "#EC5757",
      position: "absolute",
      fontSize: "0.75rem",
      top: "0",
      right: "0",
    },
  });
  const classes = styles();
  return (
    <div className={classes.formControl}>
      <label className={classes.label} htmlFor={props.inputid}>
        {props.label}
      </label>
      <input
        {...props}
        className={classes.input}
        type={props.type}
        name={props.inputid}
        id={props.inputid}
        ref={ref}
        value={props.value && passedValue}
        onChange={updateValue}
      />
      <small className={classes.errors}>{props.errors}</small>
    </div>
  );
});

export default Input;

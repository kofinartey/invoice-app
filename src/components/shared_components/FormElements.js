import React from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

// ***** LABEL COMPENENT *****
export function StyledLabel(props) {
  const darkTheme = useSelector((state) => state.theme);
  const styles = makeStyles({
    label: {
      fontSize: "0.75rem",
      color: darkTheme ? "white" : "#7E88C3",
      fontWeight: "500",
      marginBottom: "0.75rem",
    },
  });
  const classes = styles();
  return (
    <label className={classes.label} htmlFor={props.htmlFor}>
      {props.children}
    </label>
  );
}

// ***** INPUT COMPONENT *****
export function StyledInput(props) {
  const darkTheme = useSelector((state) => state.theme);
  const styles = makeStyles({
    input: {
      outline: "none",
      width: "100%",
      minWidth: "152px",
      flexGrow: "1",
      border: "2px solid #DFE3FA",
      borderRadius: "0.3rem",
      padding: "0.9rem",
      color: darkTheme && "white",
      backgroundColor: darkTheme && "#1E2139",
      borderColor: darkTheme && "#252945",
      "&:focus": {
        border: "2px solid #7C5DFA",
      },
    },
  });
  const classes = styles();

  return (
    <input
      type={props.type}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      className={classes.input}
    />
  );
}

// ***** SELECT COMPONENT *****
export function StyledSelect(props) {
  const darkTheme = useSelector((state) => state.theme);
  const styles = makeStyles({
    select: {
      color: darkTheme && "white",
      backgroundColor: darkTheme && "#1E2139",
      border: "2px solid #DFE3FA",
      borderColor: darkTheme && "#252945",
      borderRadius: "0.3rem",
      padding: "0.9rem",
      outline: "none",
      "&:focus": {
        border: "2px solid #7C5DFA",
      },
    },
  });
  const classes = styles();
  return (
    <select
      className={classes.select}
      value={props.value}
      onChange={props.onChange}
      id={props.id}
    >
      {props.children}
    </select>
  );
}

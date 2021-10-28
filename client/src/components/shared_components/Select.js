import React from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core";

function Select(props) {
  const darkTheme = useSelector((state) => state.theme);

  const styles = makeStyles({
    formControl: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "0.75rem",
      color: darkTheme ? "white" : "#7E88C3",
      fontWeight: "500",
      //   marginBottom: "0.75rem",
    },
    select: {
      color: darkTheme && "white",
      backgroundColor: darkTheme && "#1E2139",
      border: "2px solid #DFE3FA",
      borderColor: darkTheme && "#252945",
      borderRadius: "0.3rem",
      padding: "0.9rem",
      outline: "none",
      marginTop: "0.75rem",

      "&:focus": {
        border: "2px solid #7C5DFA",
      },
    },
  });
  const classes = styles();
  return (
    <div className={classes.formControl}>
      <label className={classes.label}>{props.label}</label>
      <select
        className={classes.select}
        value={props.value}
        onChange={props.onChange}
        id={props.id}
      >
        {props.children}
      </select>
    </div>
  );
}

export default Select;

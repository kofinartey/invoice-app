import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import check from "../../assets/icon-check.svg";

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
// export const StyledInput = React.forwardRef((props, ref) => {
export const StyledInput = (props) => {
  const darkTheme = useSelector((state) => state.theme);
  const styles = makeStyles({
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
      "&:focus": {
        border: "2px solid #7C5DFA",
      },
    },
  });
  const classes = styles();

  return (
    <input
      id={props.id}
      className={classes.input}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

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

// ****** CHECKBOX COMPONENT ******
export function CheckInput(props) {
  const [checked, setChecked] = useState(false);
  const darkTheme = useSelector((state) => state.theme);
  const styles = makeStyles({
    filter__option: {
      display: "flex",
      alignItems: "center",
      padding: ".5rem 0",
      "& input": {
        marginRight: "0.5rem",
        cursor: "pointer",
      },
      "& label": {
        cursor: "pointer",
      },
    },
    checkbox: {
      width: "1rem",
      height: "1rem",
      backgroundColor: props.filters[props.label.toLowerCase()]
        ? "#7C5DFA"
        : darkTheme
        ? "#1E2139"
        : "#DFE3FA",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "2px solid #7C5DFA",
      marginRight: "1rem",
      borderRadius: "0.2rem",
      position: "relative",
      top: "-0.2rem",
    },

    checkMark: {
      opacity: props.filters[props.label.toLowerCase()] ? "1" : "0",
    },
    CheckInput: {
      display: "none",
    },
  });
  const classes = styles();

  // const handleCheck = (e) => {
  //   setChecked(!checked);
  //   props.onClick(e);
  // };
  return (
    <div className={classes.filter__option}>
      <div className={classes.checkbox}>
        <img src={check} className={classes.checkMark} alt="" />
      </div>
      <input
        className={classes.CheckInput}
        type="checkbox"
        id={props.label}
        name={props.label.toLowerCase()}
        onClick={props.onClick}
        checked={props.filters[props.label.toLowerCase()]}
      />
      <label htmlFor={props.label}>
        <h5>{props.label}</h5>
      </label>
    </div>
  );
}

import React from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core";

function Button(props) {
  const darkTheme = useSelector((state) => state.theme);

  const styles = makeStyles({
    button: {
      fontSize: "0.75rem",
      fontWeight: "bold",
      padding: "1rem",
      borderRadius: "2rem",
      border: "none",
      cursor: "pointer",
    },
  });
  const classes = styles();
  return (
    <button
      className={classes.button}
      style={{ color: props.color, backgroundColor: props.background }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;

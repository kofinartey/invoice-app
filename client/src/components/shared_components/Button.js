import React from "react";

import { makeStyles } from "@mui/styles";

function Button(props) {
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
      type={props.type}
      style={{ color: props.color, backgroundColor: props.background }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;

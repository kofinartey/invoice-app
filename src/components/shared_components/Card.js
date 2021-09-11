import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

function Card(props) {
  const darkTheme = useSelector((state) => state.theme);
  const styles = makeStyles({
    Card: {
      backgroundColor: darkTheme ? "#1E2139" : "white",
      margin: "1rem 0",
      padding: "1.5rem",
      borderRadius: ".5rem",
      border: "2px solid rgba(0,0,0,0)",
      boxShadow: "-3px 21px 27px -10px rgba(136,142,176,0.05)",
      ...props.style,
    },
  });
  const classes = styles();
  return <div className={classes.Card}>{props.children}</div>;
}

export default Card;

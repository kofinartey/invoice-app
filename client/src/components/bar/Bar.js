import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";

function Bar(props) {
  const { barLength, trackLength, category } = props;
  const darkTheme = useSelector((state) => state.theme);
  const styles = makeStyles({
    track: {
      width: "100%",
      height: "0.7rem",
      backgroundColor: darkTheme ? "#1E2139" : "rgba(0,0,0,0.1)",
      borderRadius: "0.5rem",
      //   marginBottom: "0.7rem",
    },
    bar: {
      height: "100%",
      width: `${(barLength / trackLength) * 100}%`,
      borderRadius: "0.5rem",
      transition: "all ease-in-out 0.3",
      backgroundColor:
        category === "paid"
          ? "#39d69f"
          : category === "pending"
          ? "#ff8f00"
          : category === "draft" && darkTheme
          ? "white"
          : "#373b53",
    },
    transition: "all 0.3s ease-in-out",
  });
  const classes = styles();
  return (
    <div
      className={classes.track}
      bar={barLength}
      track={trackLength}
      category={category}
    >
      <div className={classes.bar}></div>
    </div>
  );
}

export default Bar;

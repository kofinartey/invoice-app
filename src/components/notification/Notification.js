import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";

function Notification() {
  const notification = useSelector((state) => state.notifications);
  const styles = makeStyles({
    notification: {
      color: "white",
      backgroundColor:
        notification.msg.toLowerCase() === "invoice deleted"
          ? "red"
          : "#9277FF",
      fontWeight: "bold",
      position: "absolute",
      padding: "1rem 2rem",
      borderRadius: "0.5rem",
      right: "4rem",
      bottom: "4rem",
      transform: notification.visible
        ? "translateX(0px)"
        : "translateX(200rem)",
      transition: "transform 0.3s",
    },
  });
  const classes = styles();
  return (
    <div>
      <div className={classes.notification}>{notification.msg}</div>
    </div>
  );
}

export default Notification;

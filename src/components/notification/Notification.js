import React from "react";
import { motion } from "framer-motion";
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
      padding: "1rem 2rem",
      borderRadius: "0.5rem",
  
    },
  });
  const classes = styles();
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      // transition={{ duration: 3 }}
      exit={{ x: 100 }}
    >
      <p className={classes.notification}>{notification.msg}</p>
    </motion.div>
  );
}

export default Notification;

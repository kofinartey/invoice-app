import { makeStyles } from "@material-ui/core";

const FiltersStyles = makeStyles({
  filter: {
    position: "relative",
    width: "12rem",
    zIndex: "5",
  },
  filter__toggler: {
    display: "flex",
    alignItems: "center",
    marginRight: "1rem",
    cursor: "pointer",
    transition: "all .3s ease-in-out",
    "& h5": {
      marginRight: "0.5rem",
    },
  },
  overlay: {
    position: "fixed",
    backgroundColor: "rgba(0,0,0,0.05)",
    width: "100%",
    height: "100vh",
    left: "0",
    top: "0",
  },
  dropDown: {
    position: "absolute",
    width: "100%",
    opacity: "0",
    transition: "opacity .3s ease-in-out",
    // top: "6rem",
  },

  dropDown__items: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
});

export default FiltersStyles;

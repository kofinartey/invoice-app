import { makeStyles } from "@material-ui/core";

const FiltersStyles = makeStyles({
  filter: {
    position: "relative",
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
    backgroundColor: "rgba(0,0,0,0)",
    width: "100%",
    height: "100vh",
    left: "0",
    top: "0",
  },
  dropDown: {
    // width: "12rem",

    position: "absolute",
    left: "-2rem",
    opacity: "0",
    transition: "opacity .3s ease-in-out",

    // top: "6rem",
  },

  dropDown__items: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingRight: "2rem",
  },
});

export default FiltersStyles;

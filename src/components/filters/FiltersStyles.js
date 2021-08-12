import { makeStyles } from "@material-ui/core";

const FiltersStyles = makeStyles({
  filter: {
    position: "relative",
    width: "12rem",
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

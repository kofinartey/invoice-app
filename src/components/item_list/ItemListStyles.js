import { makeStyles } from "@material-ui/core";

const ItemListStyles = makeStyles({
  ItemList: {
    marginTop: "6rem",
    "& h2": {
      color: "#777F98",
      marginBottom: "2rem",
    },
  },
  button: {
    width: "100%",
    fontSize: "0.75rem",
    fontWeight: "bold",
    padding: "1rem",
    borderRadius: "2rem",
    border: "none",
    color: "#7E88C3",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#DFE3FA",
    },
  },
});

export default ItemListStyles;

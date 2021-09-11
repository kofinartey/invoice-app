import { makeStyles } from "@material-ui/core";

const InvoiceListStyles = makeStyles({
  InvoiceList: {
    // marginTop: "1rem",
    // height: "100%",
  },

  empty: {
    width: "100%",
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: "3rem",
    textAlign: "center",
    fontSize: "0.75rem",
    color: "#888EB0",
    "& h2": {
      fontSize: "1.25rem",
      marginBottom: "1rem",
      color: "#0C0E16",
    },
  },
  "@media(min-width: 48rem)": {
    InvoiceList: {
      marginTop: "3rem",
    },
  },
});

export default InvoiceListStyles;

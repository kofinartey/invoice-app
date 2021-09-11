import { makeStyles } from "@material-ui/core";

const InvoiceAppStyles = makeStyles({
  InvoiceApp: {
    height: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    transition: "all .3s ease-out",
    overflowX: "hidden",
  },
  Appbar: {
    width: "100%",
    position: "fixed",
    zIndex: "1000",
  },

  "@media(min-width: 64rem)": {
    InvoiceApp: {
      flexDirection: "row",
    },
    Appbar: {
      width: "0",
      position: "fixed",
    },
  },
});

export default InvoiceAppStyles;

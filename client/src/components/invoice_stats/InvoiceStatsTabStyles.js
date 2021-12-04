import { makeStyles } from "@mui/styles";

const InvoiceStatsTabStyles = makeStyles({
  InvoiceStats: {
    display: "flex",
    justifyContent: "center",
  },
  wrapper: {
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
  },
  Box: {
    padding: "2rem",
    backgroundColor: "white",
    boxShadow: "0 0 10px 10px rgba(0,0,0,0.03)",
    borderRadius: "1rem",
    minWidth: "10.5rem",
    width: "22%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    transition: "all 0.3ease-in-out ",
    "& div": {
      //   width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      "& p:nth-of-type(1)": {
        fontSize: "2rem",
        fontWeight: "bold",
      },
      "& p:nth-of-type(2)": {
        fontSize: "0.8rem",
        marginBottom: "0.2rem",
      },
    },
  },

  "@media(min-width:64rem)": {
    wrapper: {
      width: "70%",
    },
  },
  "@media(min-width:90rem)": {
    wrapper: {
      width: "60%",
    },
  },
});

export default InvoiceStatsTabStyles;

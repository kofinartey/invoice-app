import { makeStyles } from "@mui/styles";

const DashboardStyles = makeStyles({
  Dashboard: {
    width: "100%",
    marginTop: "6rem",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },
  wrapper: {
    width: "90%",
    // margin: "auto",
  },
  invoiceStats: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "& $wrapper": {
      display: "flex",
      alignItems: "center",
    },
  },
  totalInvoices: {
    minWidth: "6rem",
    minHeight: "6rem",
    borderRadius: "1rem",
    backgroundColor: "black",
    color: "white",
    marginRight: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& p:nth-of-type(1)": {
      fontWeight: "bold",
      fontSize: "2rem",
    },
    "& p:nth-of-type(2)": {
      fontSize: "0.875rem",
    },
  },
  bars__wrapper: {
    width: "80%",
    height: "3.5rem",
    // minWidth: "rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  bar__label: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "3.2rem",
    // height: ""
    "& p": {
      marginLeft: "1rem",
      width: "7rem",
      fontSize: "0.875rem",
    },
  },
});

export default DashboardStyles;

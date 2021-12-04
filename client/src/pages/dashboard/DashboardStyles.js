import { makeStyles } from "@mui/styles";

const DashboardStyles = makeStyles({
  Dashboard: {
    width: "100%",
    marginTop: "6rem",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },
  finances: {
    backgroundColor: "#373B53",
    color: "white",
    display: "flex",
    justifyContent: "center",
    margin: "2rem 0",
  },
  finances__wrapper: {
    width: "90%",
    margin: "2rem 0",
  },
  quote: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    "& p:nth-of-type(1)": {
      fontWeight: "normal",
      fontSize: "0.8rem",
      marginBottom: "0.8rem",
    },
  },
  expected: {
    fontSize: "2rem",
  },
  finances__others: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "2rem",
  },
  chart: {
    width: "100%",
  },

  "@media(min-width: 48rem)": {
    finances__wrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    stats: {
      width: "40%",
    },
    chart: {
      width: "50%",
    },
    expected: {
      fontSize: "3rem",
    },
  },

  "@media(min-width: 64rem)": {
    finances: {
      marginTop: "4rem",
    },
    finances__wrapper: {
      width: "70%",
    },
  },
  "@media(min-width: 90rem)": {
    finances__wrapper: {
      width: "60%",
    },
  },
});

export default DashboardStyles;

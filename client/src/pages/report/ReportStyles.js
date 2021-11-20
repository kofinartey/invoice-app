import { makeStyles } from "@material-ui/core";

const ReportStyles = makeStyles({
  Report: {
    marginTop: "6rem",
  },
  wrapper: {
    width: "90%",
    maxWidth: "40rem",
    margin: "auto",
  },
  back: {
    "& img": {
      marginRight: "0.5rem",
    },
  },
  heading: {
    fontSize: "1.2rem",
    margin: "1rem 0",
  },
  form: {
    "& textarea": {
      width: "100%",
      minHeight: "10rem",
      margin: "0.5rem 0 2rem 0",
    },
    "& button": {
      width: "100%",
    },
  },
});

export default ReportStyles;

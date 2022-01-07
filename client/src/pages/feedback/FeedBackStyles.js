import { makeStyles } from "@mui/styles";

const FeedbackStyles = makeStyles({
  Feedback: {
    width: "90%",
    maxWidth: "40rem",

    marginTop: "6rem",
    margin: "auto",
  },
  wrapper: {
    width: "90%",
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
  formControl: {
    marginBottom: "1rem",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  form: {
    marginTop: " 1rem",
    "& input": {
      outline: "none",
      width: "100%",
      minWidth: "1rem",
      flexGrow: "1",
      border: "2px solid #DFE3FA",
      borderRadius: "0.3rem",
      padding: "0.9rem",
      // color: darkTheme && "white",
      // // backgroundColor: darkTheme && "#1E2139",
      // backgroundColor: darkTheme && "#252945",
      // borderColor: props.errors
      //   ? "#EC5757"
      //   : darkTheme
      //   ? "#252945"
      //   : "#DFE3FA",
      marginTop: "0.75rem",

      "&:focus": {
        border: "2px solid #7C5DFA",
      },
      "&::placeholder": {
        color: "rgba(0,0,0,0.2)",
      },
    },
    "& textarea": {
      fontWeight: "bold",
      width: "100%",
      minHeight: "10rem",
      margin: "0.5rem 0 2rem 0",
      border: "2px solid #DFE3FA",
      borderRadius: "0.3rem",
      padding: "0.9rem",
      "&:focus": {
        border: "2px solid #7C5DFA",
      },
    },
    "& button": {
      width: "100%",
      marginBottom: "0.5rem",
    },
  },
  errors: {
    color: "#EC5757",
    position: "absolute",
    fontSize: "0.75rem",
    top: "0",
    right: "0",
  },

  successModal: {
    "& $overlay": {
      width: "100%",
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      display: "flex",
      margin: "auto",
      backgroundColor: "rgba(0,0,0,0.2)",
      backdropFilter: "blur(5px)",
      zIndex: 1,
    },
    "& $modal__content": {
      width: "90%",
      display: "flex",
      justifyContent: "center",
      margin: "auto",
      "& $modal__wrapper": {
        width: "20rem",
        textAlign: "center",
        padding: "2rem 0",
        "& svg": { fontSize: "4rem", marginBottom: "2rem" },
        "& p:nth-of-type(1)": {
          fontWeight: "800",
          fontSize: "1.2rem",
          textTransform: "uppercase",
          //   marginBottom: "2rem",
        },
        "& p:nth-of-type(2)": {},
      },
    },
  },
  overlay: {},
  modal__content: {},
  modal__wrapper: {},
  "@media(min-width:48rem)": {},
});

export default FeedbackStyles;

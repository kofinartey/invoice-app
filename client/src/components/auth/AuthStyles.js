import { makeStyles } from "@mui/styles";

const AuthStyles = makeStyles({
  Auth: {
    width: "100%",
    // maxWidth: "25rem",
    height: "100vh",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "90%",
    maxWidth: "25rem",
    backgroundColor: "white",
    padding: "4rem 2rem",
    borderRadius: "1rem",
  },
  switch: {
    fontSize: "0.75rem",
    margin: "1rem 0",
    "& span": {
      fontWeight: "bold",
      color: "#7C5DFA",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  formControl: {
    position: "relative",
    marginBottom: "0.8rem",
  },
  input: {
    outline: "none",
    width: "100%",
    minWidth: "1rem",
    flexGrow: "1",
    border: "2px solid #DFE3FA",
    borderRadius: "0.3rem",
    padding: "0.9rem",
    // color: darkTheme && "white",
    // backgroundColor: darkTheme && "#1E2139",
    // borderColor: props.errors ? "#EC5757" : darkTheme ? "#252945" : "#DFE3FA",
    marginTop: "0.75rem",

    "&:focus": {
      border: "2px solid #7C5DFA",
    },
    "&::placeholder": {
      color: "rgba(0,0,0,0.2)",
    },
  },
  error: {
    color: "#EC5757",
    position: "absolute",
    fontSize: "0.75rem",
    top: "0",
    right: "0",
  },
  button: {
    width: "100%",
    borderStyle: "none",
    padding: "1rem",
    backgroundColor: "#7C5DFA",
    color: "white",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

export default AuthStyles;

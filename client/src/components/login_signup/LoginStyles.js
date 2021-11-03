import { makeStyles } from "@mui/styles";

const LoginStyles = makeStyles({
  Login: {
    width: "90%",
    maxWidth: "25rem",
    margin: "auto",
  },
  form: {
    backgroundColor: "white",
    padding: "4rem 2rem",
    borderRadius: "1rem",
  },
  switch: {
    fontSize: "0.75rem",
    margin: "1rem 0",
    "& a": {
      fontWeight: "bold",
      color: "#7C5DFA",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },

  button: {
    width: "100%",
    borderStyle: "none",
    padding: "1rem",
    backgroundColor: "#7C5DFA",
    color: "white",
    borderRadius: "0.5rem",
    fontSize: "1rem",
  },
});

export default LoginStyles;

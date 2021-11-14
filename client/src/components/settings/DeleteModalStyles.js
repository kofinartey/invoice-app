import { makeStyles } from "@material-ui/core";

const DeleteModalStyles = makeStyles({
  DeleteModal: {
    width: "100%",
    height: "100vh",
    position: "fixed",
    top: "0",
    right: "0",
    zIndex: "5",
  },
  overlay: {
    width: "100%",
    height: "100vh",
    top: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    "& p": {
      fontSize: "0.9rem",
    },
  },
  modal__wrapper: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& div": {
      margin: "1rem 0",
    },
  },
  button__section: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
});

export default DeleteModalStyles;

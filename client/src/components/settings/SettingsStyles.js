import { makeStyles } from "@mui/styles";
import { borderRadius } from "@mui/system";

const SettingsStyles = makeStyles({
  Settings: {
    height: "100vh",
    // margin: "5rem 0",
    padding: "5rem 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  wrapper: {
    width: "90%",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profile_pic: {
    width: "8rem",
    height: "8rem",
    borderRadius: "50%",
    backgroundColor: "#7C5DFA",
    margin: "3rem 0",
    color: "white",
    // border: "0.5rem solid #9277F",
    border: "0.5rem solid white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "3rem",
    fontWeight: 800,
    boxShadow: " 0 10px 10px rgba(0,0,0,0.1)",
  },
  userName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "4rem",
  },
  invoice__summary: {
    width: "15rem",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "4rem",
  },
  summary__item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& p:nth-of-type(1)": {
      //   color: "#7C5DFA",
      //   color: "#7",
      fontSize: "1.2rem",
      fontWeight: "800",
    },
    "& p:nth-of-type(2)": {
      fontSize: "0.8rem",
    },
  },
  profile__btn: {
    padding: "1rem",
    // borderStyle: "none",
    borderRadius: "0.5rem",
    fontWeight: 700,
    color: "white",
    backgroundColor: "#7C5DFA",
    border: "2px solid #7C5DFA",
    width: "15rem",
    marginBottom: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      filter: "brightness(1.2)",
    },
    "&:nth-of-type(2)": {
      backgroundColor: "white",
      color: "#7C5DFA",
    },
  },
  group__heading: {
    marginTop: "3rem",
    paddingLeft: "1.5rem",
    fontWeight: "800",
    color: "rgba(0,0,0,0.2)",
  },
  basic__info: {
    display: "grid",
  },
  preferences__unit: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "4rem",
  },
  delete__account: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "2rem 0",
    color: "#EC5757",
    fontWeight: "700",
  },
  delete__btn: {
    width: "10rem",
    maxWidth: "15rem",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    border: "none",
    backgroundColor: "black",
    "& p": {
      marginLeft: "1rem",
    },
  },

  ///MEDIA QUERIES
  ///MEDIA QUERIES
  ///MEDIA QUERIES
  "@media(min-width: 45rem)": {
    Settings: {
      backgroundColor: "red",
    },
    basic__info: {
      gridTemplateRow: "1fr 1fr",
      gridTemplateColumn: "1fr 1fr",
    },
  },
});

export default SettingsStyles;

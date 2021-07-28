import { makeStyles } from "@material-ui/core";

const NewInvoiceStyles = makeStyles({
  NewInvoice: {
    width: "100%",

    position: "fixed",
    left: "-100rem",
    top: "4.5rem",
    display: "flex",
    justifyContent: "center",
    padding: "3rem 0",
    transition: "all .3s ease-in-out",

    backgroundColor: "white",
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "fixed",
    top: "0",
    backgroundColor: "rgba(0,0,0,0.5)",
    opacity: "0",
    pointerEvents: "none",
    transition: "all .5s ease-in-out",
  },
  wrapper: {
    height: "80vh",
    width: "90%",
    paddingRight: "1rem",
    paddingBottom: "2rem",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: ".5rem",
      height: "2rem",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#DFE3FA",
      borderRadius: "3rem",
    },
  },
  goBack: {
    display: "flex",
    marginBottom: "1.75rem",
    "& img": {
      marginRight: "1rem",
    },
  },
  form__heading: {
    marginBottom: "1.75rem",
  },
  group__heading: {
    fontSize: "0.75rem",
    color: "#7C5DFA",
    margin: "2rem 0 1.75rem 0",
  },
  form__control: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1.75rem",
  },

  city_post_country: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    gridGap: "1rem",
    "& div:nth-of-type(3)": { gridColumn: "1/3", girdRow: "2/3" },
  },

  itemList: {
    color: "#777F98",
    marginTop: "4.6875rem",
  },

  "@media(min-width:48rem)": {
    NewInvoice: {
      width: "80%",
      top: "5rem",
      borderRadius: "0 1.5rem 1.5rem 0",
    },
    city_post_country: {
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "1fr",
      "& div:nth-of-type(1)": { gridColumn: "1/2", gridRow: "1/2" },
      "& div:nth-of-type(2)": { gridColumn: "2/3", gridRow: "1/2" },
      "& div:nth-of-type(3)": { gridColumn: "3/4", girdRow: "1/2" },
    },
    pay__date: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridGap: "1rem",
      "& div:nth-of-type(1)": { gridColumn: "1/2" },
      "& div:nth-of-type(2)": { gridColumn: "2/3" },
    },
  },
  "@media(min-width:64rem)": {
    NewInvoice: {
      height: "100vh",
      width: "60%",
      top: "0",
      paddingLeft: "1.5rem",
      // left: "6.4375rem",
    },
  },
});

export default NewInvoiceStyles;

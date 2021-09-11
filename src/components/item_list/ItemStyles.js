import { makeStyles } from "@material-ui/core";

const ItemStyles = makeStyles({
  Item: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    gridGap: "1rem",
    "& div:nth-of-type(1)": {
      gridColumn: "1/5",
      gridRow: "1/2",
    },
    "& div:nth-of-type(2)": {
      gridColumn: "1/2",
      gridRows: "2/3",
    },
  },
  form__control: {
    // height: "0",
    display: "flex",
    flexDirection: "column",
    marginBottom: "1.75rem",
  },
  total: {
    marginTop: "1rem",
    color: "#888EB0",
  },
  delete: {
    alignSelf: "center",
    justifySelf: "end",
    width: "0.75rem",
    height: "1rem",
    paddingTop: "0.8rem",
  },

  "@media(min-width: 48rem)": {
    Item: {
      gridTemplateColumns: "3fr 1fr 2fr 1fr 1fr",
      gridTemplateRows: "1fr ",
      "& div:nth-of-type(1)": {
        gridColumn: "1/2",
        gridRow: "1/2",
      },
      "& div:nth-of-type(2)": {
        gridColumn: "2/3",
        gridRow: "1/2",
      },
      "& div:nth-of-type(3)": {
        gridColumn: "3/4",
        gridRow: "1/2",
      },
      "& div:nth-of-type(4)": {
        gridColumn: "4/5",
        gridRow: "1/2",
      },
      "& div:nth-of-type(5)": {
        gridColumn: "5/6",
        gridRow: "1/2",
      },
    },
  },
});

export default ItemStyles;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { StyledLabel } from "../shared_components/FormElements";
import formatAmount from "../../helper_functions/formatAmount";
import { deleteItem } from "../../redux/items/itemActions";
import ItemStyles from "./ItemStyles";
import trashCan from "../../assets/icon-delete.svg";

//create a small component to use in this main component.
const ItemPart = (props) => {
  const darkTheme = useSelector((state) => state.theme);
  const styles = makeStyles({
    item_part: {
      color: darkTheme ? "white" : "#888EB0",
      backgroundColor: darkTheme ? "#1E2139" : "rgba(223, 227, 250, 0.4 )",
      padding: "1rem",
      borderRadius: "0.5rem",
    },
  });
  const classes = styles();
  return <h4 className={classes.item_part}>{props.children}</h4>;
};

///MAIN COMPONENT FUNCTION
///MAIN COMPONENT FUNCTION
///MAIN COMPONENT FUNCTION
function Item(props) {
  const { item } = props;
  const classes = ItemStyles();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteItem(item.id));
  };

  //onchange
  //  take item id, run to item list and single out that item
  //  return new item object
  //  set event.taget.name to value

  return (
    <div className={classes.Item}>
      <div className={classes.form__control}>
        <StyledLabel htmlFor="name">Item Name</StyledLabel>
        <ItemPart>{item.name}</ItemPart>
      </div>
      <div className={classes.form__control}>
        <StyledLabel htmlFor="qty">Qty.</StyledLabel>
        <ItemPart>{item.quantity}</ItemPart>
      </div>
      <div className={classes.form__control}>
        <StyledLabel htmlFor="price">Price</StyledLabel>
        <ItemPart>{formatAmount(item.price)}</ItemPart>
      </div>
      <div className={classes.form__control}>
        <StyledLabel htmlFor="total">Total</StyledLabel>
        <ItemPart>{formatAmount(item.total)}</ItemPart>
      </div>
      <div
        className={`${classes.form__control} ${classes.delete}`}
        onClick={handleDelete}
      >
        <img src={trashCan} alt="" />
      </div>
    </div>
  );
}

export default Item;

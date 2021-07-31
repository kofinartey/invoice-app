import React, { useState, useEffect } from "react";
import { StyledInput, StyledLabel } from "../shared_components/FormElements";
import ItemStyles from "./ItemStyles";
import { IconButton } from "@material-ui/core";
import useInputState from "../../hooks/useInputState";
import trashCan from "../../assets/icon-delete.svg";

function Item(props) {
  const classes = ItemStyles();
  const [name, updateName, resetName] = useInputState(props.item.name);
  const [qty, updateQty, resetQty] = useInputState(props.item.qty);
  const [price, updatePrice, resetPrice] = useInputState(props.item.price);
  const [total, updateTotal] = useState("0");

  //update total on price or qty change
  useEffect(() => {
    if (qty === "" || price === "") {
      updateTotal("0");
    } else {
      let calculated = parseFloat(qty) * parseFloat(price);
      updateTotal(calculated.toFixed(2));
    }
  }, [qty, price]);

  return (
    <div className={classes.Item}>
      <div className={classes.form__control}>
        <StyledLabel htmlFor="name">Item Name</StyledLabel>
        <StyledInput type="text" id="name" value={name} onChange={updateName} />
      </div>
      <div className={classes.form__control}>
        <StyledLabel htmlFor="qty">Qty.</StyledLabel>
        <StyledInput type="text" id="qty" value={qty} onChange={updateQty} />
      </div>
      <div className={classes.form__control}>
        <StyledLabel htmlFor="price">Price</StyledLabel>
        <StyledInput
          type="text"
          id="price"
          value={price}
          onChange={updatePrice}
        />
      </div>
      <div className={classes.form__control}>
        <StyledLabel htmlFor="total">Total</StyledLabel>

        <h4 className={classes.total}>{total}</h4>
      </div>
      <div className={`${classes.form__control} ${classes.delete}`}>
        <img src={trashCan} alt="" />
      </div>
    </div>
  );
}

export default Item;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4, v4 } from "uuid";
import { useForm } from "react-hook-form";
import { addItem } from "../../redux/items/itemActions";
import Item from "./Item";
import Input from "../shared_components/Input";
import useInputState from "../../hooks/useInputState";
import ItemListStyles from "./ItemListStyles";
import { StyledLabel } from "../shared_components/FormElements";

function ItemList() {
  const classes = ItemListStyles();
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme);
  const itemList = useSelector((state) => state.items);
  const [name, updateName, resetName] = useInputState("");
  const [qty, updateQty, resetQty] = useInputState("");
  const [price, updatePrice, resetPrice] = useInputState("");
  const [total, updateTotal] = useState("");

  const dataToAdd = {
    itemName: name,
    itemQty: parseInt(qty),
    itemPrice: parseInt(price),
    itemTotal: parseInt(total),
    itemId: v4(),
  };
  //update total on price or qty change
  useEffect(() => {
    if (qty === "" || price === "") {
      updateTotal("0");
    } else {
      let calculated = parseFloat(qty) * parseFloat(price);
      updateTotal(calculated.toFixed(2));
    }
  }, [qty, price]);

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addItem(dataToAdd));
    resetName();
    resetQty();
    resetPrice();
  };

  return (
    <div className={classes.ItemList}>
      <h2>Item List</h2>
      {itemList.map((item) => (
        <Item
          item={item}
          key={item.id}
          itemdata={item}
          // handleChange={handleChange(item.id)}
        />
      ))}
      <div className={classes.form}>
        <Input
          type="text"
          label="Item Name"
          inputId="name"
          value={name}
          onChange={updateName}
          // {...register("name")}
        />
        <Input
          type="text"
          label="Qty."
          inputId="qty"
          value={qty}
          onChange={updateQty}
          // {...register("qty")}
        />
        <Input
          type="text"
          label="Price"
          inputId="price"
          value={price}
          onChange={updatePrice}
          // {...register("price")}
        />
        <div className={classes.total}>
          <StyledLabel>Total</StyledLabel>
          <h4>{total}</h4>
        </div>
      </div>

      <button
        className={classes.button}
        style={{ backgroundColor: darkTheme && "#252945" }}
        onClick={handleAdd}
      >
        + Add New Item
      </button>
    </div>
  );
}

export default ItemList;

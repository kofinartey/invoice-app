import React, { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Item from "./Item";
import Button from "../shared_components/Button";
import ItemListStyles from "./ItemListStyles";

function ItemList() {
  const classes = ItemListStyles();
  const darkTheme = useSelector((state) => state.theme);
  const [list, setList] = useState([
    { name: "logo", id: uuidv4(), qty: "2", price: "24", total: "" },
  ]);

  const addItem = () => {
    setList([
      ...list,
      { name: "", id: uuidv4(), qty: "", price: "", total: "" },
    ]);
  };

  return (
    <div className={classes.ItemList}>
      <h2>Item List</h2>
      {list.map((item) => (
        <Item item={item} key={item.id} addItem={addItem} />
      ))}
      <button
        className={classes.button}
        style={{ backgroundColor: darkTheme && "#252945" }}
        onClick={(e) => {
          e.preventDefault();
          addItem();
        }}
      >
        + Add New Item
      </button>
    </div>
  );
}

export default ItemList;

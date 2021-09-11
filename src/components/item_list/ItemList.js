import React, { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Item from "./Item";
import Button from "../shared_components/Button";
import ItemListStyles from "./ItemListStyles";
import { deleteInvoice } from "../../redux/invoice/invoiceActions";
import { date } from "yup";

function ItemList() {
  const classes = ItemListStyles();
  const darkTheme = useSelector((state) => state.theme);
  const [itemList, setItemList] = useState([
    { name: "", id: uuidv4(), qty: "", price: "", total: "" },
  ]);

  const addItem = () => {
    setItemList([
      ...itemList,
      { name: "", id: uuidv4(), qty: "", price: "", total: "" },
    ]);
  };
  //onchange
  //  setStatewith a new
  //  return new item object
  //  set event.taget.name to value
  // const handleChange = () => {
  //   let ITEM = list.find((item) =>
  //     item.id === id ? { ...item, name: "a test" } : item
  //   );
  //   // setList((curState) => [...curState, ITEM]);
  //   // console.log(ITEM);
  // };

  const deleteItem = (id) => {
    if (itemList.length > 1) {
      setItemList((curState) => curState.filter((item) => item.id !== id));
    }
  };

  const getListData = (id, data) => {
    console.group(data, id);
    itemList.find((item) =>
      item.id === id
        ? {
            name: data.name,
            qty: data.qty,
            price: data.price,
            total: data.total,
          }
        : item
    );
  };

  return (
    <div className={classes.ItemList}>
      <h2>Item List</h2>
      {itemList.map((item) => (
        <Item
          item={item}
          key={item.id}
          addItem={addItem}
          deleteItem={deleteItem}
          getListData={getListData}
          // handleChange={handleChange(item.id)}
        />
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

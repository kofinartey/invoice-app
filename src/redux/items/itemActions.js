import { ADD_ITEM, DELETE_ITEM } from "./itemTypes";

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: {
      name: item.itemName,
      qty: item.itemQty,
      price: item.itemPrice,
      id: item.id,
    },
  };
};

export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    payload: id,
  };
};

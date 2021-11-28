import { ADD_ITEM, DELETE_ITEM, RESET_ITEMS } from "./itemTypes";
import { v4 } from "uuid";

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: {
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.total,
      id: v4(),
    },
  };
};

export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    payload: id,
  };
};

export const resetItems = () => {
  return {
    type: RESET_ITEMS,
  };
};

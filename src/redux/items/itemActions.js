import { ADD_ITEM, DELETE_ITEM, RESET_ITEMS } from "./itemTypes";

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: {
      name: item.itemName,
      quantity: item.itemQty,
      price: item.itemPrice,
      total: item.itemTotal,
      id: item.itemId,
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

import { ADD_ITEM, DELETE_ITEM, RESET_ITEMS } from "./itemTypes";

const initialState = [];

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.payload];
    case DELETE_ITEM:
      return state.filter((item) => item.id !== action.payload);
    case RESET_ITEMS:
      return initialState;
    default:
      return state;
  }
};

export default itemReducer;

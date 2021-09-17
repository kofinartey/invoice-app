import invoiceData from "../../data.json";
import { ADD_INVOICE, DELETE, EDIT, MARK_AS_PAID } from "./invoiceTypes";

const invoiceReducer = (state = invoiceData, action) => {
  switch (action.type) {
    case ADD_INVOICE:
      return [action.payload, ...state];
    case EDIT:
      // return state;
      // console.log(action.payload);
      const newState = state.filter(
        (invoice) => invoice.id !== action.payload.id
      );
      return [action.payload, ...newState];
    case DELETE:
      let newList = state.filter((invoice) => invoice.id !== action.payload);
      return newList;
    case MARK_AS_PAID:
      return state.map((invoice) =>
        invoice.id === action.payload ? { ...invoice, status: "paid" } : invoice
      );
    default:
      return state;
  }
};
export default invoiceReducer;

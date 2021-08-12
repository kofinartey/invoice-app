import invoiceData from "../../data.json";
import { ADD_INVOICE, DELETE, EDIT, MARK_AS_PAID } from "./invoiceTypes";

const invoiceReducer = (state = invoiceData, action) => {
  switch (action.type) {
    case ADD_INVOICE:
      console.log(action);
      return [action.payload, ...state];
    case DELETE:
      let newList = state.filter((invoice) => invoice.id !== action.payload);
      return newList;
    case MARK_AS_PAID:
      console.log(action.payload);
      return state.map((invoice) =>
        invoice.id === action.payload ? { ...invoice, status: "paid" } : invoice
      );
    default:
      return state;
  }
};
export default invoiceReducer;

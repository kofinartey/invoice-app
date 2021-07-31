import invoiceData from "../../data.json";

const invoiceReducer = (state = invoiceData, action) => {
  switch (action.type) {
    case "ADD_INVOICE":
      console.log(action);
      return [action.payload, ...state];
    default:
      return state;
  }
};
export default invoiceReducer;

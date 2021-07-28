import invoiceData from "../../data.json";

const invoiceReducer = (state = invoiceData, action) => {
  switch (action.type) {
    case "ADD_INVOICE":
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default invoiceReducer;

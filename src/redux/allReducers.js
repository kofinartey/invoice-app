import { combineReducers } from "redux";
import themeReducer from "./theme/themeReducer";
import invoiceReducer from "./invoice/invoiceReducers";
import formDisplayReducer from "./form_display/formDisplayReducer";
import deleteConfirmationReducer from "./delete_confirmation/deleteConfirmReducer";
import itemReducer from "./items/itemReducer";

const allReducers = combineReducers({
  theme: themeReducer,
  invoice: invoiceReducer,
  formDisplay: formDisplayReducer,
  deleteConfirmation: deleteConfirmationReducer,
  items: itemReducer,
});

export default allReducers;

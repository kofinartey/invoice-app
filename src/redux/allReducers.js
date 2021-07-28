import { combineReducers } from "redux";
import themeReducer from "./theme/themeReducer";
import invoiceReducer from "./invoice/invoiceReducers";
import formDisplayReducer from "./form_display/formDisplayReducer";

const allReducers = combineReducers({
  theme: themeReducer,
  invoice: invoiceReducer,
  formDisplay: formDisplayReducer,
});

export default allReducers;

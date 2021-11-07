import { combineReducers } from "redux";
import themeReducer from "./theme/themeReducer";
import invoiceReducer from "./invoice/invoiceReducers";
import formDisplayReducer from "./form_display/formDisplayReducer";
import deleteConfirmationReducer from "./delete_confirmation/deleteConfirmReducer";
import itemReducer from "./items/itemReducer";
import notificationReducer from "./notification/notificationReducer";
import userReducer from "./auth/authReducer";

const allReducers = combineReducers({
  theme: themeReducer,
  invoice: invoiceReducer,
  formDisplay: formDisplayReducer,
  deleteConfirmation: deleteConfirmationReducer,
  items: itemReducer,
  notifications: notificationReducer,
  user: userReducer,
});

export default allReducers;

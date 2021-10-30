// import invoiceData from "../../data.json";
import {
  FETCH_INVOICES_REQUEST,
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE,
  ADD_INVOICE,
  REMOVE,
  EDIT,
  MARK_AS_PAID,
  ADDED_NOTIFICATION,
  HIDE_NOTIFICATION,
  DRAFT_NOTIFICATION,
  DELETED_NOTIFICATION,
} from "./invoiceTypes";

const initialState = {
  invoices: [],
  loading: false,
  error: "",
  notifications: {
    visible: false,
    msg: "",
  },
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVOICES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload,
        loading: false,
      };
    case FETCH_INVOICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case ADD_INVOICE:
      return {
        ...state,
        invoices: [action.payload, ...state.invoices],
      };
    //yet to fix
    case EDIT:
      const newState = state.filter(
        (invoice) => invoice.id !== action.payload.id
      );
      return [action.payload, ...newState];

    case MARK_AS_PAID:
      return {
        ...state,
        invoices: state.invoices.map((invoice) =>
          invoice._id === action.payload
            ? { ...invoice, status: "paid" }
            : invoice
        ),
      };

    case REMOVE:
      return {
        ...state,
        invoices: state.invoices.filter(
          (invoice) => invoice._id !== action.payload
        ),
      };

    //notification stuff
    //notification stuff
    //notification stuff
    case ADDED_NOTIFICATION:
      return {
        ...state,
        notifications: {
          visible: true,
          msg: "New Invoice Added",
        },
      };
    case DRAFT_NOTIFICATION:
      return {
        ...state,
        notifications: {
          visible: true,
          msg: "Saved as Draft",
        },
      };
    case DELETED_NOTIFICATION:
      return {
        ...state,
        notifications: {
          visible: true,
          msg: "Invoice Deleted",
        },
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        notifications: {
          visible: false,
          msg: "",
        },
      };
    default:
      return state;
  }
};
export default invoiceReducer;

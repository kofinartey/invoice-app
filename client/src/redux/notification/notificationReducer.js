const ADDED = "ADDED";
const DELETED = "DELETED";
const DRAFT = "DRAFT";
const HIDE = "HIDE";

export const addedNotification = () => {
  return {
    type: ADDED,
  };
};
export const deletedNotification = () => {
  return {
    type: DELETED,
  };
};
export const draftNotification = () => {
  return {
    type: DRAFT,
  };
};
export const hideNotification = () => {
  return {
    type: HIDE,
  };
};

const initialState = {
  visible: false,
  msg: "",
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDED:
      return { visible: true, msg: "New Invoice Added" };
    case DRAFT:
      return { visible: true, msg: "Saved as Draft" };
    case DELETED:
      return { visible: true, msg: "Invoice(s) Deleted" };
    case HIDE:
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;

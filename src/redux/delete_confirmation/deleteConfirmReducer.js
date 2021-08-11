const initialState = false;

const deleteConfirmationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_CONFIRMATION":
      return !state;
    default:
      return state;
  }
};

export default deleteConfirmationReducer;

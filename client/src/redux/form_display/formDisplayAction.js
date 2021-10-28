import {
  HIDE_FORM,
  TOGGLE_EDIT_FORM,
  TOGGLE_NEW_FORM,
} from "./formDisplayTypes";

export const toggleNewForm = () => {
  return {
    type: TOGGLE_NEW_FORM,
  };
};
export const toggleEditForm = () => {
  return {
    type: TOGGLE_EDIT_FORM,
  };
};
export const hideForm = () => {
  return {
    type: HIDE_FORM,
  };
};

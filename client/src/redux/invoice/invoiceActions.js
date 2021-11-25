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
  DELETE_ALL,
} from "./invoiceTypes";

export const fetchInvoicesRequest = () => ({ type: FETCH_INVOICES_REQUEST });

export const fetchInvoicesSuccess = (data) => ({
  type: FETCH_INVOICES_SUCCESS,
  payload: data,
});

export const fetchInvoiceFailure = (error) => ({
  type: FETCH_INVOICES_FAILURE,
  payload: error,
});

export const addInvoice = (newInvoice) => {
  return {
    type: ADD_INVOICE,
    payload: newInvoice,
  };
};

export const editInvoice = (editedInvoice) => {
  return {
    type: EDIT,
    payload: editedInvoice,
  };
};

export const removeInvoice = (id) => {
  return {
    type: REMOVE,
    payload: id,
  };
};
export const markAsPaid = (id) => {
  return {
    type: MARK_AS_PAID,
    payload: id,
  };
};

//notification action creators
export const addedNotification = () => ({
  type: ADDED_NOTIFICATION,
});
export const deletedNotification = () => ({
  type: DELETED_NOTIFICATION,
});
export const draftNotification = () => ({
  type: DRAFT_NOTIFICATION,
});
export const hideNotification = () => ({
  type: HIDE_NOTIFICATION,
});

// async actions to communicate with the server
export const fetchInvoices = () => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    // console.log(token);
    dispatch(fetchInvoicesRequest());
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/invoices`, {
      headers: {
        "x-auth-token": token,
      },
    });
    const invoices = await response.json();
    dispatch(fetchInvoicesSuccess(invoices));
  } catch (error) {
    dispatch(fetchInvoiceFailure(error));
    console.log("Couldn't fetch invoices");
    console.log(error);
  }
};

//post a complete form
export const postInvoice = (invoiceData) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/invoices`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(invoiceData),
    });
    const data = await response.json();
    dispatch(addInvoice(data));
    //toggle notification based on form sent
    if (data.status === "pending")
      toggleNotification(dispatch, addedNotification());
    else if (data.status === "draft")
      toggleNotification(dispatch, draftNotification());
  } catch (error) {
    console.log("Couldn't post request");
    console.log(error.message);
  }
};

//post a draft invoice
export const postDraft = (invoiceData) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/invoices/draft`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(invoiceData),
      }
    );
    const data = await response.json();
    dispatch(addInvoice(data));
  } catch (error) {
    console.log("Failed to post draft");
    console.log(error);
  }
};

// post an edited invoice
export const patchInvoice = (id, invoiceData) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/invoices/edit/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(invoiceData),
      }
    );
    const data = await response.json();
    dispatch(editInvoice(data));
  } catch (error) {
    console.log(error.message);
  }
};

//change status from pending to paid
export const patchStatus = (id) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/invoices/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );
    const data = await response.json();
    dispatch(markAsPaid(data));
  } catch (error) {
    console.log("Failed to change invoice status");
    console.log(error);
  }
};

export const deleteInvoice = (id) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/invoices/${id}`,
      {
        method: "DELETE",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(removeInvoice(data._id));
  } catch (error) {
    console.log(error.message);
  }
};

const toggleNotification = (action, type) => {
  action(type); //action becomes dispatch when called
  setTimeout(() => {
    action(hideNotification());
  }, 2000);
};

export const deleteAllInvoices = (userId) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/invoices/deleteAll/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );
    const data = await response.json();
    dispatch({ type: DELETE_ALL });
  } catch (error) {
    console.log(error);
  }
};

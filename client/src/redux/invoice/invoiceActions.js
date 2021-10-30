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
    // payload: {
    //   id: newInvoice.id,
    //   createdAt: newInvoice.invoiceDate,
    //   paymentDue: newInvoice.paymentDate,
    //   description: newInvoice.formData.description,
    //   paymentTerm: newInvoice.formData.paymentTerm,
    //   clientName: newInvoice.formData.clientName,
    //   clientEmail: newInvoice.formData.clientEmail,
    //   status: newInvoice.status,
    //   senderAddress: {
    //     street: newInvoice.formData.street,
    //     city: newInvoice.formData.city,
    //     postCode: newInvoice.formData.postCode,
    //     country: newInvoice.formData.country,
    //   },
    //   clientAddress: {
    //     street: newInvoice.formData.clientStreet,
    //     city: newInvoice.formData.clientCity,
    //     postCode: newInvoice.formData.clientPostCode,
    //     country: newInvoice.formData.clientCountry,
    //   },
    //   items: [...newInvoice.items],
    //   total: newInvoice.totalAmount,
    // },
  };
};

export const editInvoice = (editedInvoice) => {
  return {
    type: EDIT,
    payload: {
      id: editedInvoice.id,
      createdAt: editedInvoice.invoiceDate,
      paymentDue: editedInvoice.paymentDate,
      description: editedInvoice.formData.description,
      paymentTerm: editedInvoice.formData.paymentTerm,
      clientName: editedInvoice.formData.clientName,
      clientEmail: editedInvoice.formData.clientEmail,
      status: editedInvoice.status,
      senderAddress: {
        street: editedInvoice.formData.street,
        city: editedInvoice.formData.city,
        postCode: editedInvoice.formData.postCode,
        country: editedInvoice.formData.country,
      },
      clientAddress: {
        street: editedInvoice.formData.clientStreet,
        city: editedInvoice.formData.clientCity,
        postCode: editedInvoice.formData.clientPostCode,
        country: editedInvoice.formData.clientCountry,
      },
      items: [...editedInvoice.items],
      total: editedInvoice.totalAmount,
    },
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
    dispatch(fetchInvoicesRequest());
    const response = await fetch("http://localhost:5000/api/invoices");
    const invoices = await response.json();

    dispatch(fetchInvoicesSuccess(invoices));
  } catch (error) {
    dispatch(fetchInvoiceFailure(error));
    console.log("Couldn't fetch invoices");
    console.log(error);
  }
};

export const postInvoice = (invoiceData) => async (dispatch) => {
  console.log(invoiceData);
  try {
    const response = await fetch("http://localhost:5000/api/invoices", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
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

export const deleteInvoice = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:5000/api/invoices/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
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

import { ADD_INVOICE, DELETE, EDIT, MARK_AS_PAID } from "./invoiceTypes";

export const addInvoice = (newInvoice) => {
  return {
    type: ADD_INVOICE,
    payload: {
      id: newInvoice.id,
      createdAt: newInvoice.invoiceDate,
      paymentDue: newInvoice.paymentDate,
      description: newInvoice.formData.description,
      paymentTerm: newInvoice.formData.paymentTerm,
      clientName: newInvoice.formData.clientName,
      clientEmail: newInvoice.formData.clientEmail,
      status: newInvoice.status,
      senderAddress: {
        street: newInvoice.formData.street,
        city: newInvoice.formData.city,
        postCode: newInvoice.formData.postCode,
        country: newInvoice.formData.country,
      },
      clientAddress: {
        street: newInvoice.formData.clientStreet,
        city: newInvoice.formData.clientCity,
        postCode: newInvoice.formData.clientPostCode,
        country: newInvoice.formData.clientCountry,
      },
      items: [...newInvoice.items],
      total: newInvoice.totalAmount,
    },
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

export const deleteInvoice = (id) => {
  return {
    type: DELETE,
    payload: id,
  };
};
export const markAsPaid = (id) => {
  return {
    type: MARK_AS_PAID,
    payload: id,
  };
};

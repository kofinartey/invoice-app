import { ADD_INVOICE, DELETE, EDIT, MARK_AS_PAID } from "./invoiceTypes";
import { generateID } from "../../helper_functions/generateID";

export const addInvoice = (newInvoice) => {
  console.log(newInvoice);
  return {
    type: ADD_INVOICE,
    // payload: newInvoice,
    payload: {
      id: generateID(),
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

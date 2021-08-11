import { ADD_INVOICE, DELETE, EDIT, MARK_AS_PAID } from "./invoiceTypes";
import { generateID } from "../../helper_functions/generateID";

export const addInvoice = (newInvoice) => {
  return {
    type: ADD_INVOICE,
    payload: {
      id: generateID(),
      createdAt: newInvoice.createdAt,
      paymentDue: newInvoice.paymentDue,
      description: newInvoice.description,
      paymentTerm: newInvoice.paymentTerm,
      clientName: newInvoice.clientName,
      clientEmail: newInvoice.clientEmail,
      status: "pending",
      senderAddress: {
        street: newInvoice.street,
        city: newInvoice.city,
        postCode: newInvoice.postCode,
        country: newInvoice.country,
      },
      clientAddress: {
        street: newInvoice.clientStreet,
        city: newInvoice.clientCity,
        postCode: newInvoice.clientPostCode,
        country: newInvoice.clientCountry,
      },
      total: "",
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

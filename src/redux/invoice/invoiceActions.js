import { ADD_INVOICE } from "./invoiceTypes";
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
        street: newInvoice.senderAddress.street,
        city: newInvoice.senderAddress.city,
        postCode: newInvoice.senderAddress.postCode,
        country: newInvoice.senderAddress.country,
      },
      clientAddress: {
        street: newInvoice.clientAddress.street,
        city: newInvoice.clientAddress.city,
        postCode: newInvoice.clientAddress.postCode,
        country: newInvoice.clientAddress.country,
      },
      total: "",
    },
  };
};

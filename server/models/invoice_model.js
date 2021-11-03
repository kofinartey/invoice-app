const mongoose = require("mongoose");
const Joi = require("joi");

//create a client schema
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  postCode: String,
  country: String,
});

const itemSchema = new mongoose.Schema({
  name: String,

  //   id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //   },
  quantity: Number,
  price: Number,
  total: Number,
});

//create a invoice schema
const invoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: String,
  paymentDue: String,
  description: String,
  paymentTerms: Number,
  clientName: String,
  clientEmail: String,
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items: [itemSchema],
  total: {
    type: Number,
    default: 0,
  },
});

//invoice model
const Invoice = new mongoose.model("Invoice", invoiceSchema);

const validateInvoice = (data) => {
  const schema = Joi.object({
    id: Joi.string().min(6).max(6).required(),
    status: Joi.string().required(),
    createdAt: Joi.string(),
    paymentDue: Joi.string(),
    description: Joi.string().max(255),
    paymentTerms: Joi.number(),
    clientName: Joi.string().max(255),
    clientEmail: Joi.string().email(),
    senderAddress: Joi.object({
      street: Joi.string().max(255),
      city: Joi.string().max(255),
      postCode: Joi.string().max(255),
      country: Joi.string().max(255),
    }),
    clientAddress: Joi.object({
      street: Joi.string().max(255),
      city: Joi.string().max(255),
      postCode: Joi.string().max(255),
      country: Joi.string().max(255),
    }),
    items: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().max(255),
          id: Joi.string(),
          quantity: Joi.number().min(0).max(100),
          price: Joi.number().min(1),
          total: Joi.number().min(0),
        })
      )
      .required(),
    total: Joi.number().min(0),
  });

  return schema.validate(data);
};

module.exports = {
  Invoice,
  validateInvoice,
};

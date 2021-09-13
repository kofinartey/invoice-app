import * as yup from "yup";

const schema = yup.object().shape({
  street: yup.string().required("can't be empty"),
  city: yup.string().required("can't be empty"),
  postcode: yup.string().required("can't be empty"),
  country: yup.string().required("can't be empty"),
  clientName: yup.string().required("can't be empty"),
  clientEmail: yup.string().email("invalid email").required("can't be empty"),
  clientStreet: yup.string().required("can't be empty"),
  clientCity: yup.string().required("can't be empty"),
  clientPostCode: yup.string().required("can't be empty"),
  clientCountry: yup.string().required("can't be empty"),
  description: yup.string(),
});

export default schema;

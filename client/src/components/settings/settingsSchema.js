import * as yup from "yup";

// export const infoSchema = yup.object().shape({
//   firstName: yup.string().required("can't be empty"),
//   lasttName: yup.string().required("can't be empty"),
//   email: yup.string().email().required("can't be empty"),
// });

export const infoSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
});

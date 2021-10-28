const validation = (values) => {
  let errors = {};

  if (!values.street.trim()) {
    errors.street = "can't be empty";
    console.log(errors.street);
  }
  if (!values.city.trim()) {
    errors.city = "can't be empty";
    console.log(errors.city);
  }
  if (!values.postCode.trim()) {
    errors.postCode = "can't be empty";
    console.log(errors.postCode);
  }
  if (!values.clientName.trim()) {
    errors.clientName = "can't be empty";
    console.log(errors.clientName);
  }
  // client email
  if (!values.clientEmail.trim()) {
    errors.clientEmail = "can't be empty";
    console.log(errors.clientEmail);
  } else if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.clientEmail)
  ) {
    errors.clientEmail = "invalid email";
  }

  if (!values.clientCountry.trim()) {
    errors.clientCountry = "can't be empty";
    console.log(errors.clientCountry);
  }

  if (!values.description.trim()) {
    errors.description = "can't be empty";
    console.log(errors.description);
  }

  return errors;
};

export default validation;

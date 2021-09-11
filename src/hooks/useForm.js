import { useState } from "react";

const initialState = {
  street: "",
  city: "",
  postCode: "",
  country: "",
  clientName: "",
  clientEmail: "",
  clientStreet: "",
  clientCity: "",
  clientPostCode: "",
  clientCountry: "",
  description: "",
  status: "",
};

const useForm = () => {
  const [values, setValues] = useState(initialState);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetInputs();
  };

  const resetInputs = () => {
    console.log("reset inputs called");
    setValues(initialState);
  };

  return { values, errors, handleChange, handleSubmit, resetInputs };
};

export default useForm;

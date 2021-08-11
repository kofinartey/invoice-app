import { useState } from "react";

const useForm = () => {
  const [values, setValues] = useState({
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
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return { values, errors, handleChange, handleSubmit };
};

export default useForm;

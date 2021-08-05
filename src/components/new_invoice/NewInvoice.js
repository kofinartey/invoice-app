import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { showForm } from "../../redux/form_display/formDisplayAction";
import { addInvoice } from "../../redux/invoice/invoiceActions";
import ItemList from "../item_list/ItemList";
import Button from "../shared_components/Button";
import {
  StyledLabel,
  StyledInput,
  StyledSelect,
} from "../shared_components/FormElements";
import useInputState from "../../hooks/useInputState";
import NewInvoiceStyles from "./NewInvoiceStyles";
import leftArrow from "../../assets/icon-arrow-left.svg";

function NewInvoice() {
  const classes = NewInvoiceStyles();
  const { register, handleSubmit } = useForm();
  const formTopRef = useRef(null);
  const darkTheme = useSelector((state) => state.theme);
  const formDisplay = useSelector((state) => state.formDisplay);
  const dispatch = useDispatch();
  const today = dayjs(new Date()).format("YYYY-MM-DD");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    let width = window.innerWidth;
    setWindowWidth(width);
  });

  //store data from form inputs
  const [address, updateAddress, resetAddress] = useInputState("");
  const [city, updateCity, resetCity] = useInputState("");
  const [postCode, updatePostCode, resetPostCode] = useInputState("");
  const [country, updateCountry, resetCountry] = useInputState("");

  const [clientName, updateClientName, resetClientName] = useInputState("");
  const [clientEmail, updateClientEmail, resetClientEmail] = useInputState("");
  const [clientAddress, updateClientAddress, resetClientAddress] =
    useInputState("");
  const [clientcity, updateClientCity, resetClientCity] = useInputState("");
  const [clientpostCode, updateClientPostCode, resetClientPostCode] =
    useInputState("");
  const [clientcountry, updateClientCountry, resetClientCountry] =
    useInputState("");
  const [date, setDate] = useState(today);
  const [payTerms, setPayTerms] = useState(1);
  const [description, updateDescription, resetDescription] = useInputState("");

  const resetInputs = () => {
    //reset all input fields at once
    resetAddress();
    resetCity();
    resetPostCode();
    resetCountry();
    resetClientName();
    resetClientEmail();
    resetClientAddress();
    resetClientAddress();
    resetClientCity();
    resetClientPostCode();
    resetClientCountry();
    resetDescription();

    setTimeout(() => {
      formTopRef.current.scrollIntoView();
    }, 300);
  };

  //create an object to hold all entries and pass to the main invoices state
  const newInvoice = {
    createdAt: date,
    paymentDue: dayjs().add(payTerms, "day").format("YYYY-MM-DD"),
    description: description,
    clientName: clientName,
    clientEmail: clientEmail,
    status: "pending",
    senderAddress: {
      street: address,
      city: city,
      postCode: postCode,
      country: country,
    },
    clientAddress: {
      street: clientAddress,
      city: clientcity,
      postCode: clientpostCode,
      country: clientcountry,
    },
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    // rendered component has two parts
    //     * AN OVERLAY
    //     * NEW INVOICE CONTENT
    //        #wrapper
    //            --headers
    //            --form
    <>
      {/* ***** OVERLAY ***** */}
      <div
        className={classes.overlay}
        onClick={() => {
          dispatch(showForm());
          resetInputs();
        }}
        style={{
          left: formDisplay && "0",
          opacity: formDisplay && "1",
          pointerEvents: formDisplay && "all",
        }}
      ></div>

      {/* ***** NEW INVOICE CONTENT ***** */}
      <div
        className={classes.NewInvoice}
        style={{
          backgroundColor: darkTheme && "#141625",
          left:
            windowWidth > 1024 && formDisplay
              ? "5rem"
              : formDisplay
              ? "0"
              : null,
        }}
      >
        {/* ----- content wrapper ----- */}
        <div className={classes.wrapper}>
          <Link
            to=""
            ref={formTopRef}
            className={classes.goBack}
            style={{ color: darkTheme && "white" }}
            onClick={() => {
              dispatch(showForm());
              resetInputs();
            }}
          >
            <img src={leftArrow} alt="" />
            <h4>Go back</h4>
          </Link>
          <h2
            className={classes.form__heading}
            style={{ color: darkTheme && "white" }}
          >
            New Invoice
          </h2>
          {/* ---- form begins ----- */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ----- owner details ----- */}
            <h5 className={classes.group__heading}>Bill From</h5>
            <div className={classes.form__control}>
              <StyledLabel htmlFor="address">Street Address</StyledLabel>
              <StyledInput
                type="text"
                className={classes.input}
                ref={register}
                id="address"
                value={address}
                onChange={updateAddress}
              />
            </div>

            <div className={classes.city_post_country}>
              <div className={classes.form__control}>
                <StyledLabel htmlFor="city">City</StyledLabel>
                <StyledInput
                  type="text"
                  id="city"
                  ref={register}
                  value={city}
                  onChange={updateCity}
                />
              </div>
              <div className={classes.form__control}>
                <StyledLabel htmlFor="postCode">Post Code</StyledLabel>
                <StyledInput
                  type="text"
                  id="postCode"
                  value={postCode}
                  onChange={updatePostCode}
                />
              </div>
              <div className={classes.form__control}>
                <StyledLabel htmlFor="country">Country</StyledLabel>
                <StyledInput
                  type="text"
                  id="country"
                  value={country}
                  onChange={updateCountry}
                />
              </div>
            </div>

            {/* ------ client details -------- */}
            <h5 className={classes.group__heading}>Bill To</h5>
            <div className={classes.form__control}>
              <StyledLabel htmlFor="clientName">Client's Name</StyledLabel>
              <StyledInput
                type="text"
                id="clientName"
                value={clientName}
                onChange={updateClientName}
              />
            </div>
            <div className={classes.form__control}>
              <StyledLabel htmlFor="clientEmail">Client's Email</StyledLabel>
              <StyledInput
                type="email"
                id="clientEmail"
                value={clientEmail}
                onChange={updateClientEmail}
              />
            </div>
            <div className={classes.form__control}>
              <StyledLabel htmlFor="clientStreet">Street Address</StyledLabel>
              <StyledInput
                type="email"
                id="clientStreet"
                value={clientAddress}
                onChange={updateClientAddress}
              />
            </div>
            <div className={classes.city_post_country}>
              {/* grouped for city,post code, country easy styling */}
              <div className={classes.form__control}>
                <StyledLabel htmlFor="clientCity">City</StyledLabel>
                <StyledInput
                  type="text"
                  id="clientCity"
                  value={clientcity}
                  onChange={updateClientCity}
                />
              </div>
              <div className={classes.form__control}>
                <StyledLabel htmlFor="clientPostCode">Post Code</StyledLabel>
                <StyledInput
                  type="text"
                  id="clientPostCode"
                  value={clientpostCode}
                  onChange={updateClientPostCode}
                />
              </div>
              <div className={classes.form__control}>
                <StyledLabel htmlFor="clientCountry">Country</StyledLabel>
                <StyledInput
                  type="text"
                  id="clientCountry"
                  value={clientcountry}
                  onChange={updateClientCountry}
                />
              </div>
            </div>

            <div className={classes.pay__date}>
              {/* group date and payment terms for easy styling */}
              <div className={classes.form__control}>
                <StyledLabel htmlFor="invoiceDate">Invoice Date</StyledLabel>
                <StyledInput
                  value={date}
                  type="date"
                  id="invoiceDate"
                  onChange={(e) =>
                    setDate(dayjs(e.target.value).format("YYYY-MM-DD"))
                  }
                />
              </div>
              <div className={classes.form__control}>
                <StyledLabel htmlFor="paymentTerms">Payment Terms</StyledLabel>
                <StyledSelect
                  value={payTerms}
                  id="paymentTerms"
                  style={{ background: darkTheme && "#1E2139" }}
                  onChange={(e) => {
                    setPayTerms(e.target.value);
                  }}
                >
                  <option value="1">Net 1 day</option>
                  <option value="7">Net 7 days</option>
                  <option value="14">Net 14 days</option>
                  <option value="30">Net 30 days</option>
                </StyledSelect>
              </div>
            </div>

            <div className={classes.form__control}>
              <StyledLabel htmlFor="projectDescription">
                Project Description
              </StyledLabel>
              <StyledInput
                type="text"
                id="projectDescription"
                value={description}
                onChange={updateDescription}
              />
            </div>

            {/* ----- item details ----- */}
            {/* <h3 className={classes.itemList}>Item List</h3>
          <div className={classes.form__control}>
            <StyledLabel htmlFor="itemName">Item Name</StyledLabel>
            <input type="text" id="itemName" />
          </div>
          <div className={classes.form__control}>
            <StyledLabel htmlFor="quantity">Quantity</StyledLabel>
            <input type="text" id="quantity" />
          </div>
          <div className={classes.form__control}>
            <StyledLabel htmlFor="quantity">Quantity</StyledLabel>
            <h4> XXX.00</h4>
          </div>
          <div>
            <img src={trashCan} alt="" />
          </div> */}
            <ItemList />
            <footer className={classes.footer}>
              <Button
                color={darkTheme && "white"}
                background={darkTheme && "#252945"}
                onClick={(e) => {
                  console.log(e);
                  e.preventDefault();
                }}
              >
                Discard
              </Button>
              <Button
                color="white"
                background="#373B53"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Save as Draft
              </Button>
              <Button
                color="white"
                background="#7C5DFA"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addInvoice(newInvoice));
                  resetInputs();
                  dispatch(showForm());
                }}
              >
                Save & Send
              </Button>
            </footer>
          </form>
          {/* ----- content wrapper ends ----- */}
        </div>
        {/* <footer className={classes.footer}>
          <h1> this is the footer</h1>
        </footer> */}
        {/* ***** NEW INVOICE CONTENT ENDS ****** */}
      </div>
    </>
  );
}

export default NewInvoice;

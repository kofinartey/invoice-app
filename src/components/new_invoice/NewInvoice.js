import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { showForm } from "../../redux/form_display/formDisplayAction";
import { addInvoice } from "../../redux/invoice/invoiceActions";
import ItemList from "../item_list/ItemList";
import Button from "../shared_components/Button";
import { StyledLabel, StyledInput } from "../shared_components/FormElements";
import useForm from "../../hooks/useForm";
import Input from "../shared_components/Input";
import useInputState from "../../hooks/useInputState";
import validation from "./validation";
import formatAmount from "../../helper_functions/formatAmount";
import NewInvoiceStyles from "./NewInvoiceStyles";
import leftArrow from "../../assets/icon-arrow-left.svg";
import trashCan from "../../assets/icon-delete.svg";
import Select from "../shared_components/Select";

function NewInvoice() {
  const classes = NewInvoiceStyles();

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

  const { values, handleChange, handleSubmit, resetInputs } = useForm();
  // const { errors } = validation();
  const [date, setDate] = useState(today);
  const [payTerms, setPayTerms] = useState(1);

  // item list state management

  const onSubmit = (data) => {
    console.log(data);
    resetInputs();
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
          // resetInputs();
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
              // resetInputs();
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
          <form noValidate>
            {/* ----- owner details ----- */}
            <h5 className={classes.group__heading}>Bill From</h5>

            <Input type="text" label="Street Address" inputId="street" />

            <div className={classes.city_post_country}>
              <Input type="text" label="City" inputId="city" />
              <Input type="text" label="Post Code" inputId="postcode" />
              <Input type="text" label="Country" inputId="counry" />
            </div>
            {/* ------ client details -------- */}
            <h5 className={classes.group__heading}>Bill To</h5>
            <Input type="text" label="Client's Name" inputId="clientName" />
            <Input type="email" label="Client's Email" inputId="clientEmail" />
            <Input type="text" label="Street Address" inputId="clientStreet" />

            <div className={classes.city_post_country}>
              {/* grouped for city,post code, country easy styling */}
              <Input type="text" label="City" inputId="clientCity" />
              <Input type="text" label="Post Code" inputId="clientPostCode" />
              <Input type="text" label="Country" inputId="clientCountry" />
            </div>

            <div className={classes.pay__date}>
              {/* group date and payment terms for easy styling */}
              <Input
                type="date"
                label="Invoice Date"
                inputId="invoiceDate"
                // value={date}
              />
              <Select label="Payment Terms">
                <option value="1">Net 1 day</option>
                <option value="7">Net 7 days</option>
                <option value="14">Net 14 days</option>
                <option value="30">Net 30 days</option>
              </Select>
            </div>
            <Input
              type="text"
              label="Project Description"
              inputId="description"
            />

            {/* ----- ITEM DETAILS ----- */}
            <div className={classes.itemList}>
              <ItemList />
            </div>
            {/* <ItemList /> */}

            <footer className={classes.footer}>
              <Button
                color={darkTheme && "white"}
                background={darkTheme && "#252945"}
                onClick={(e) => {
                  // e.preventDefault();
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
                type="submit"
                color="white"
                background="#7C5DFA"
                onClick={(e) => {
                  handleSubmit(e);
                  validation(values);
                  // dispatch(addInvoice(values));
                  console.log(values);
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

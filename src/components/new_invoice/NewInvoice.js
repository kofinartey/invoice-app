import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { showForm } from "../../redux/form_display/formDisplayAction";
import { addInvoice } from "../../redux/invoice/invoiceActions";
import ItemList from "../item_list/ItemList";
import Button from "../shared_components/Button";
import {
  StyledLabel,
  StyledInput,
  StyledSelect,
} from "../shared_components/FormElements";
import useForm from "../../hooks/useForm";
import useInputState from "../../hooks/useInputState";
import validation from "./validation";
import formatAmount from "../../helper_functions/formatAmount";
import NewInvoiceStyles from "./NewInvoiceStyles";
import leftArrow from "../../assets/icon-arrow-left.svg";
import trashCan from "../../assets/icon-delete.svg";

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
  const [itemList, setItemList] = useState([
    { name: "test", id: uuidv4(), qty: 0, price: 0, total: 0 },
  ]);

  const handleItemChange = (e) => {
    let id = e.target.parentElement.parentElement.id;
    setItemList((curState) => [
      curState.map((item) =>
        item.id === id ? { [e.target.name]: e.target.value } : item
      ),
    ]);
  };

  const addItem = () => {
    setItemList([
      ...itemList,
      { name: "", id: uuidv4(), qty: "", price: "", total: "" },
    ]);
  };
  const deleteItem = (id) => {
    if (itemList.length > 1) {
      setItemList((curState) => curState.filter((item) => item.id !== id));
    }
  };

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
            <div className={classes.form__control}>
              <StyledLabel htmlFor="street">Street Address</StyledLabel>
              <StyledInput
                type="text"
                className={classes.input}
                id="street"
                name="street"
                value={values.address}
                onChange={handleChange}
              />
              {/* <p>{errors.address?.message}</p> */}
            </div>
            <div className={classes.city_post_country}>
              <div className={classes.form__control}>
                <StyledLabel htmlFor="city">City</StyledLabel>
                <StyledInput
                  type="text"
                  id="city"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  // {...register("city")}
                />
              </div>
              <div className={classes.form__control}>
                <StyledLabel htmlFor="postCode">Post Code</StyledLabel>
                <StyledInput
                  type="text"
                  id="postCode"
                  name="postCode"
                  value={values.postCode}
                  onChange={handleChange}
                  // {...register("postCode")}
                />
              </div>
              <div className={classes.form__control}>
                <StyledLabel htmlFor="country">Country</StyledLabel>
                <StyledInput
                  type="text"
                  id="country"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  // {...register("country")}
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
                name="clientName"
                value={values.clientName}
                onChange={handleChange}
                // {...register("clientName", { required: true })}
              />
            </div>
            <div className={classes.form__control}>
              <StyledLabel htmlFor="clientEmail">Client's Email</StyledLabel>
              <StyledInput
                type="email"
                id="clientEmail"
                name="clientEmail"
                value={values.clientEmail}
                onChange={handleChange}
              />
            </div>
            <div className={classes.form__control}>
              <StyledLabel htmlFor="clientStreet">Street Address</StyledLabel>
              <StyledInput
                type="email"
                id="clientStreet"
                name="clientStreet"
                value={values.clientStreet}
                onChange={handleChange}
                // {...register("clientStreet", { required: true })}
              />
            </div>
            <div className={classes.city_post_country}>
              {/* grouped for city,post code, country easy styling */}
              <div className={classes.form__control}>
                <StyledLabel htmlFor="clientCity">City</StyledLabel>
                <StyledInput
                  type="text"
                  id="clientCity"
                  name="clientCity"
                  value={values.clientCity}
                  onChange={handleChange}
                  // {...register("clientCity", { required: true })}
                />
              </div>
              <div className={classes.form__control}>
                <StyledLabel htmlFor="clientPostCode">Post Code</StyledLabel>
                <StyledInput
                  type="text"
                  id="clientPostCode"
                  name="clientPostCode"
                  value={values.clientPostCode}
                  onChange={handleChange}
                  // {...register("clientPostCode", { required: true })}
                />
              </div>
              <div className={classes.form__control}>
                <StyledLabel htmlFor="clientCountry">Country</StyledLabel>
                <StyledInput
                  type="text"
                  id="clientCountry"
                  name="clientCountry"
                  value={values.clientCountry}
                  onChange={handleChange}
                  // {...register("clientCountry", { required: true })}
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
                  name="invoiceDate"
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
                  name="paymentTerms"
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
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </div>

            {/* ----- ITEM DETAILS ----- */}
            <div className={classes.itemList}>
              <h2>Item List</h2>
              {itemList.map((item) => (
                <div className={classes.Item} key={item.id} id={item.id}>
                  <div className={classes.form__control}>
                    <StyledLabel htmlFor="name">Item Name</StyledLabel>
                    <StyledInput
                      type="text"
                      id="name"
                      name="item_name"
                      value={item.name}
                      onChange={handleItemChange}
                    />
                  </div>
                  <div className={classes.form__control}>
                    <StyledLabel htmlFor="qty">Qty.</StyledLabel>
                    <StyledInput
                      type="text"
                      id="qty"
                      name="qty"
                      value={item.qty}
                      onChange={handleItemChange}
                    />
                  </div>
                  <div className={classes.form__control}>
                    <StyledLabel htmlFor="price">Price</StyledLabel>
                    <StyledInput
                      type="text"
                      id="price"
                      name="price"
                      value={item.price}
                      onChange={handleItemChange}
                    />
                  </div>
                  <div className={classes.form__control}>
                    <StyledLabel htmlFor="total">Total</StyledLabel>

                    <h4 className={classes.total}>{item.total}</h4>
                  </div>
                  <div
                    className={`${classes.form__control} ${classes.delete}`}
                    onClick={() => {
                      deleteItem(item.id);
                    }}
                  >
                    <img src={trashCan} alt="" />
                  </div>
                </div>
              ))}
              <button
                className={classes.itemList__button}
                style={{ backgroundColor: darkTheme && "#252945" }}
                onClick={(e) => {
                  e.preventDefault();
                  addItem();
                }}
              >
                + Add New Item
              </button>
            </div>
            {/* <ItemList /> */}

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

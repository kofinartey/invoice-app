//package imports
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";

//my imports
import schema from "./schema";
import { hideForm } from "../../redux/form_display/formDisplayAction";
import { postInvoice, editInvoice } from "../../redux/invoice/invoiceActions";
import {
  addedNotification,
  draftNotification,
  hideNotification,
} from "../../redux/notification/notificationReducer";
import { resetItems } from "../../redux/items/itemActions";
import Select from "../shared_components/Select";
import ItemList from "../item_list/ItemList";
import Button from "../shared_components/Button";
import Input from "../shared_components/Input";
import { generateID } from "../../helper_functions/generateID";
import NewInvoiceStyles from "./InvoiceFormStyles";
import leftArrow from "../../assets/icon-arrow-left.svg";

//MAIN COMPONENT FUNCTION
//MAIN COMPONENT FUNCTION
function InvoiceForm(props) {
  const classes = NewInvoiceStyles();
  const formTopRef = useRef(null);
  const darkTheme = useSelector((state) => state.theme);
  const formDisplay = useSelector((state) => state.formDisplay);
  // const notification = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.items);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    let width = window.innerWidth;
    setWindowWidth(width);
  });

  // for the purpose of draft and actual complete invoice,
  // set state to show if the form will be validated (NB: draft needs no validtion)
  // if form won't be validated,set validating(state) to FALSE and use schema with no required inputs (ie. schema.no_validate)
  const [validating, setValidating] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: validating
      ? yupResolver(schema.validate)
      : yupResolver(schema.no_validate),
  });
  const [total, setTotal] = useState(0);
  //handle date and calculate due date from payTerms
  //recalculate dueDate anytime date or payment terms change(s)
  const today = dayjs(new Date()).format("YYYY-MM-DD");
  const [date, setDate] = useState(today);
  const [payTerms, setPayTerms] = useState(1);
  const [dueDate, setDueDate] = useState(
    dayjs(date).add(payTerms, "days").format("D MMM YYYY")
  );
  useEffect(() => {
    setDueDate(dayjs(date).add(payTerms, "days").format("D MMM YYYY"));
  }, [date, payTerms]);

  //scroll to top of form when form is toggled
  useEffect(() => {
    formTopRef.current.scrollIntoView();
    reset();
  }, [formDisplay, reset]);

  //calculate total for all items
  useEffect(() => {
    const calculateTotal = () => {
      if (itemList.length === 1) {
        setTotal(itemList[0].total);
      } else {
        const calculated =
          itemList.length > 0 &&
          itemList.reduce((accumulator, currentValue) => {
            return accumulator.total + currentValue.total;
          });
        setTotal(calculated);
      }
    };
    calculateTotal();
  }, [itemList]);

  const resetAll = () => {
    dispatch(hideForm());
    reset();
    dispatch(resetItems());
    setDate(today);
    setPayTerms(1);
  };

  //add new invoice to state ,hide form and reset input fields
  const submitForm = (data) => {
    //define the shape of the object to send to the server
    let dataToAdd = {
      id: generateID(),
      createdAt: dayjs(date).format("D MMM YYYY"),
      paymentDue: dueDate,
      description: data.description,
      paymentTerms: payTerms,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      status: validating ? "pending" : "draft",
      senderAddress: {
        street: data.street,
        city: data.city,
        postCode: data.postcode,
        country: data.country,
      },
      clientAddress: {
        street: data.clientStreet,
        city: data.clientCity,
        postCode: data.clientPostCode,
        country: data.clientCountry,
      },
      items: itemList,
      total: itemList.length === 0 ? 0 : total,
    };
    dispatch(postInvoice(dataToAdd));
    resetAll();
  };

  const handleEdit = (data) => {
    let dataToAdd = {
      id: props.values.id,
      formData: data,
      invoiceDate: dayjs(date).format("D MMM YYYY"),
      paymentDate: dueDate,
      items: itemList,
      status: props.values.status,
      totalAmount: total,
    };
    dispatch(editInvoice(dataToAdd));
    resetAll();
  };

  //remove validation for draft and reset validation state
  //NB: clicking on draft button calls both handleSaveDraft() and submitForm()
  const handleSaveDraft = (e) => {
    setValidating(false);
    setTimeout(() => {
      setValidating(true);
    }, 100);
  };

  // MAIN RENDER
  // MAIN RENDER
  return (
    /* 
    This form component is used in two scenarios, first to enter a new invoice ,
    and to edit an existing invoice. When rendering the form for a NEW INVOICE, 
    no props are passed to it, hence the component is rendered as <InvoiceForm/>.
    To edit an invoice, the data of the invoice is passed as a prop, thus <InvoiceForm values ={invoice.values}/>.
    In view of this certain parts of the form are displayed depending on the presence of props.values
    */

    //COMPONENT LAYOUT
    // rendered component has two parts
    //     * AN OVERLAY
    //     * NEW INVOICE CONTENT
    //        #wrapper
    //            --headers
    //            --form
    <>
      {/* ***** OVERLAY ***** */}
      <motion.div
        className={classes.overlay}
        onClick={() => {
          resetAll();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      ></motion.div>

      {/* ***** NEW INVOICE CONTENT ***** */}
      <motion.div
        className={classes.NewInvoice}
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.1 }}
        exit={{ x: -1000 }}
        style={{
          backgroundColor: darkTheme && "#141625",
          left:
            windowWidth > 1024 && (formDisplay.new || formDisplay.edit)
              ? "5rem"
              : // : formDisplay.new
                // ? "0"
                "0",
        }}
      >
        {/* ----- content wrapper ----- */}
        <div className={classes.wrapper}>
          <div className={classes.form__top} ref={formTopRef}>
            {props.values ? (
              <h1 style={{ color: darkTheme && "white" }}>
                Edit <span>#</span>
                {props.values.id}
              </h1>
            ) : (
              <div>
                <div
                  to=""
                  className={classes.goBack}
                  style={{ color: darkTheme && "white" }}
                  onClick={() => {
                    dispatch(hideForm());
                    // resetInputs();
                  }}
                >
                  <img src={leftArrow} alt="" />
                  <h4>Go back</h4>
                </div>
                <h2
                  className={classes.form__heading}
                  style={{ color: darkTheme && "white" }}
                >
                  New Invoice
                </h2>
              </div>
            )}
          </div>
          {/* ---- form begins ----- */}
          <form onSubmit={handleSubmit(props.values ? handleEdit : submitForm)}>
            {/* ----- owner details ----- */}
            <h5 className={classes.group__heading}>Bill From</h5>

            <Input
              type="text"
              label="Street Address"
              inputid="street"
              value={props.values && props.values.senderAddress.street}
              {...register("street")}
              errors={errors.street?.message}
            />

            <div className={classes.city_post_country}>
              <Input
                type="text"
                label="City"
                inputid="city"
                {...register("city")}
                value={props.values && props.values.senderAddress.city}
                errors={errors.city?.message}
              />
              <Input
                type="text"
                label="Post Code"
                inputid="postcode"
                {...register("postcode")}
                value={props.values && props.values.senderAddress.postCode}
                errors={errors.postcode?.message}
              />
              <Input
                type="text"
                label="Country"
                inputid="country"
                {...register("country")}
                value={props.values && props.values.senderAddress.country}
                errors={errors.country?.message}
              />
            </div>
            {/* ------ client details -------- */}
            <h5 className={classes.group__heading}>Bill To</h5>
            <Input
              type="text"
              label="Client's Name"
              inputid="clientName"
              {...register("clientName")}
              value={props.values && props.values.clientName}
              errors={errors.clientName?.message}
            />
            <Input
              type="email"
              label="Client's Email"
              inputid="clientEmail"
              {...register("clientEmail")}
              value={props.values && props.values.clientEmail}
              errors={errors.clientEmail?.message}
            />
            <Input
              type="text"
              label="Street Address"
              inputid="clientStreet"
              {...register("clientStreet")}
              value={props.values && props.values.clientAddress.street}
              errors={errors.clientStreet?.message}
            />

            <div className={classes.city_post_country}>
              {/* grouped for city,post code, country easy styling */}
              <Input
                type="text"
                label="City"
                inputid="clientCity"
                {...register("clientCity")}
                value={props.values && props.values.clientAddress.city}
                errors={errors.clientCity?.message}
              />
              <Input
                type="text"
                label="Post Code"
                inputid="clientPostCode"
                {...register("clientPostCode")}
                value={props.values && props.values.clientAddress.postCode}
                errors={errors.clientPostCode?.message}
              />
              <Input
                type="text"
                label="Country"
                inputid="clientCountry"
                {...register("clientCountry")}
                value={props.values && props.values.clientAddress.country}
                errors={errors.clientCountry?.message}
              />
            </div>

            <div className={classes.pay__date}>
              {/* group date and payment terms for easy styling */}
              <Input
                type="date"
                label="Invoice Date"
                inputid="invoiceDate"
                value={props.values ? props.values.createdAt : date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              <Select
                label="Payment Terms"
                value={props.values ? props.values.paymentTerms : payTerms}
                onChange={(e) => {
                  setPayTerms(e.target.value);
                }}
              >
                <option value="1">Net 1 day</option>
                <option value="7">Net 7 days</option>
                <option value="14">Net 14 days</option>
                <option value="30">Net 30 days</option>
              </Select>
            </div>
            <Input
              type="text"
              label="Project Description"
              inputid="description"
              {...register("description")}
              value={props.values && props.values.description}
            />

            {/* ----- ITEM DETAILS ----- */}
            <div className={classes.itemList}>
              <ItemList items={props.values && props.values.items} />
            </div>
            {/* <ItemList /> */}
            {/* <div className={classes.shadow}></div> */}

            <footer className={classes.footer}>
              {/* display different versions of the footer for new and edit forms */}

              <Button
                color={darkTheme && "white"}
                background={darkTheme && "#252945"}
                onClick={(e) => {
                  e.preventDefault();
                  resetAll();
                }}
              >
                Discard
              </Button>
              {!props.values && (
                <Button
                  color="white"
                  background="#373B53"
                  onClick={handleSaveDraft}
                >
                  Save as Draft
                </Button>
              )}
              <Button color="white" background="#7C5DFA">
                {props.values ? "Save Changes" : "Save & Send"}
              </Button>
            </footer>
          </form>
          {/* ----- content wrapper ends ----- */}
        </div>
        {/* <footer className={classes.footer}>
          <h1> this is the footer</h1>
        </footer> */}
        {/* ***** NEW INVOICE CONTENT ENDS ****** */}
      </motion.div>
    </>
  );
}

export default React.memo(InvoiceForm);

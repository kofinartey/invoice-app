import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import { showForm } from "../../redux/form_display/formDisplayAction";
import { addInvoice } from "../../redux/invoice/invoiceActions";
import { resetItems } from "../../redux/items/itemActions";
import Select from "../shared_components/Select";
import ItemList from "../item_list/ItemList";
import Button from "../shared_components/Button";
import Input from "../shared_components/Input";
import NewInvoiceStyles from "./NewInvoiceStyles";
import leftArrow from "../../assets/icon-arrow-left.svg";

function NewInvoice() {
  const classes = NewInvoiceStyles();
  const formTopRef = useRef(null);
  const darkTheme = useSelector((state) => state.theme);
  const formDisplay = useSelector((state) => state.formDisplay);
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

  const resetAll = () => {
    dispatch(showForm());
    setTimeout(() => {
      reset();
      dispatch(resetItems());
      setDate(today);
      setPayTerms(1);
    }, 1000);
  };

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

  //add new invoice to state ,hide form and reset input fields
  const submitForm = (data) => {
    let dataToAdd = {
      formData: data,
      invoiceDate: dayjs(date).format("D MMM YYYY"),
      paymentDate: dueDate,
      items: itemList,
      status: validating ? "pending" : "draft",
      totalAmount: total,
    };
    dispatch(addInvoice(dataToAdd));
    resetAll();
  };

  //remove validation for draft and reset validation state
  const handleSaveDraft = (e) => {
    setValidating(false);
    setTimeout(() => {
      setValidating(true);
    }, 100);
  };

  // MAIN RENDER
  // MAIN RENDER
  // MAIN RENDER
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
          resetAll();
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
          <form onSubmit={handleSubmit(submitForm)}>
            {/* ----- owner details ----- */}
            <h5 className={classes.group__heading}>Bill From</h5>

            <Input
              type="text"
              label="Street Address"
              inputid="street"
              {...register("street")}
              errors={errors.street?.message}
            />

            <div className={classes.city_post_country}>
              <Input
                type="text"
                label="City"
                inputid="city"
                {...register("city")}
                errors={errors.city?.message}
              />
              <Input
                type="text"
                label="Post Code"
                inputid="postcode"
                {...register("postcode")}
                errors={errors.postcode?.message}
              />
              <Input
                type="text"
                label="Country"
                inputid="country"
                {...register("country")}
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
              errors={errors.clientName?.message}
            />
            <Input
              type="email"
              label="Client's Email"
              inputid="clientEmail"
              {...register("clientEmail")}
              errors={errors.clientEmail?.message}
            />
            <Input
              type="text"
              label="Street Address"
              inputid="clientStreet"
              {...register("clientStreet")}
              errors={errors.clientStreet?.message}
            />

            <div className={classes.city_post_country}>
              {/* grouped for city,post code, country easy styling */}
              <Input
                type="text"
                label="City"
                inputid="clientCity"
                {...register("clientCity")}
                errors={errors.clientCity?.message}
              />
              <Input
                type="text"
                label="Post Code"
                inputid="clientPostCode"
                {...register("clientPostCode")}
                errors={errors.clientPostCode?.message}
              />
              <Input
                type="text"
                label="Country"
                inputid="clientCountry"
                {...register("clientCountry")}
                errors={errors.clientCountry?.message}
              />
            </div>

            <div className={classes.pay__date}>
              {/* group date and payment terms for easy styling */}
              <Input
                type="date"
                label="Invoice Date"
                inputid="invoiceDate"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              <Select
                label="Payment Terms"
                value={payTerms}
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
                  e.preventDefault();
                  resetAll();
                }}
              >
                Discard
              </Button>
              <Button
                color="white"
                background="#373B53"
                onClick={handleSaveDraft}
              >
                Save as Draft
              </Button>
              <Button color="white" background="#7C5DFA">
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

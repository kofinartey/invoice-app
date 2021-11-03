import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import SkeletonList from "../skeleton_list/SkeletonList";
import Invoice from "../invoice/Invoice";
import InvoiceListStyles from "./InvoiceListStyles";
import empty from "../../assets/illustration-empty.svg";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import CircularProgress from "@mui/material/CircularProgress";

function InvoiceList(props) {
  const classes = InvoiceListStyles();
  const invoiceData = useSelector((state) => state.invoice.invoices);
  const darkTheme = useSelector((state) => state.theme);
  const formDisplay = useSelector((state) => state.formDisplay);
  const loading = useSelector((state) => state.invoice.loading);
  const serverError = useSelector((state) => state.invoice.error);

  //forgotten why I set this. But I'll leave if be for now
  useEffect(() => {
    if (formDisplay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  });

  const displayList = () => {
    return (
      <div className={classes.InvoiceList}>
        {invoiceData.map((invoice) => (
          <Invoice data={invoice} key={invoice.id} />
        ))}
      </div>
    );
  };
  const showEmpty = () => {
    return (
      <div className={classes.empty}>
        <img src={empty} alt="" />
        <div className={classes.text}>
          <h2 style={{ color: darkTheme && "white" }}>There is nothing here</h2>
          <p style={{ color: darkTheme && "white" }}>
            Create an invoice by clicking the
          </p>
          <p style={{ color: darkTheme && "white" }}>
            <b>New Invoice</b> button and get started
          </p>
        </div>
      </div>
    );
  };

  const showLoading = () => {
    return (
      <div>
        <SkeletonList />
      </div>
    );
  };

  const showServerError = () => {
    return (
      <div className={classes.status}>
        <WarningRoundedIcon color="secondary" />
        <h4>Couldn't fetch data from the server</h4>
      </div>
    );
  };

  //conditionally render invoice list based on selected filters
  if (loading) {
    return <>{showLoading()}</>;
  } else if (serverError) {
    return <>{showServerError()}</>;
  } else if (props.filters.paid && invoiceData.length > 1) {
    let PAID = invoiceData.filter((invoice) => invoice.status === "paid");
    return PAID.map((invoice) => <Invoice data={invoice} key={invoice.id} />);
  } else if (props.filters.pending && invoiceData.length > 1) {
    let PENDING = invoiceData.filter((invoice) => invoice.status === "pending");
    return PENDING.map((invoice) => (
      <Invoice data={invoice} key={invoice.id} />
    ));
  } else if (props.filters.draft && invoiceData.length > 1) {
    let DRAFT = invoiceData.filter((invoice) => invoice.status === "draft");
    return DRAFT.map((invoice) => <Invoice data={invoice} key={invoice.id} />);
  } else if (invoiceData.length === 0) {
    return <>{showEmpty()}</>;
  } else {
    return <div>{displayList()}</div>;
  }

  // return <div>{invoiceData.length === 0 ? showEmpty() : displayList()}</div>;
}

export default InvoiceList;

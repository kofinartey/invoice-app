import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Invoice from "../invoice/Invoice";
import InvoiceListStyles from "./InvoiceListStyles";
import empty from "../../assets/illustration-empty.svg";

function InvoiceList(props) {
  const classes = InvoiceListStyles();
  const invoiceData = useSelector((state) => state.invoice);
  const darkTheme = useSelector((state) => state.theme);
  const formDisplay = useSelector((state) => state.formDisplay);

  useEffect(() => {
    if (formDisplay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  });

  const displayList = () => {
    return (
      // <div className={classes.InvoiceList}>
      invoiceData.map((invoice) => <Invoice data={invoice} key={invoice.id} />)
      // </div>
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

  // const renderFiltered = () => {
  //   if (props.filters.paid) {
  //     let PAID = invoiceData.filter((invoice) => invoice.status === "paid");
  //     filteredInvoices.push(PAID);
  //     console.log(filteredInvoices);
  //   } else {
  //     setFilteredInvoices((curState) =>
  //       curState.filter((invoice) => invoice.status !== "paid")
  //     );
  //     console.log(filteredInvoices);
  //   }

  //   // return filteredInvoices.map((invoice) => (
  //   //   <Invoice data={invoice} key={invoice.id} />
  //   // ));
  // };

  if (props.filters.paid) {
    let PAID = invoiceData.filter((invoice) => invoice.status === "paid");
    return PAID.map((invoice) => <Invoice data={invoice} key={invoice.id} />);
  } else if (props.filters.pending) {
    let PENDING = invoiceData.filter((invoice) => invoice.status === "pending");
    return PENDING.map((invoice) => (
      <Invoice data={invoice} key={invoice.id} />
    ));
  } else if (props.filters.draft) {
    let DRAFT = invoiceData.filter((invoice) => invoice.status === "draft");
    return DRAFT.map((invoice) => <Invoice data={invoice} key={invoice.id} />);
  } else if (invoiceData === 0) {
    showEmpty();
  } else {
    return <div>{displayList()}</div>;
  }

  // return <div>{invoiceData.length === 0 ? showEmpty() : displayList()}</div>;
}

export default InvoiceList;

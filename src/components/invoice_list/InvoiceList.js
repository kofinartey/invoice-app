import React from "react";
import { useSelector } from "react-redux";
import Invoice from "../invoice/Invoice";
import InvoiceListStyles from "./InvoiceListStyles";
import empty from "../../assets/illustration-empty.svg";

function InvoiceList() {
  const classes = InvoiceListStyles();
  const invoiceData = useSelector((state) => state.invoice);
  const darkTheme = useSelector((state) => state.theme);

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

  return <div>{invoiceData.length === 0 ? showEmpty() : displayList()}</div>;
}

export default InvoiceList;

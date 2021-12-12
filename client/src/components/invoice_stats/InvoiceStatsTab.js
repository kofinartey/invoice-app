import React, { useState, memo } from "react";
import { useSelector } from "react-redux";
//my imports
import InvoiceStatsTabStyles from "./InvoiceStatsTabStyles";
import Bar from "../bar/Bar";

function InvoiceStatsTab() {
  const classes = InvoiceStatsTabStyles();
  const darkTheme = useSelector((state) => state.theme);
  const invoices = useSelector((state) => state.invoice.invoices);
  const paidInvoices = invoices.filter((invoice) => invoice.status === "paid");
  const pendingInvoices = invoices.filter(
    (invoice) => invoice.status === "pending"
  );
  const draftInvoices = invoices.filter(
    (invoice) => invoice.status === "draft"
  );

  //box subcomponent
  const Box = (props) => {
    return (
      <div
        className={classes.Box}
        style={{
          backgroundColor: darkTheme && "#373B53",
          color: darkTheme && "white",
          ...props.style,
        }}
      >
        <div>
          <p>{props.value}</p>
          <p>{props.status}</p>
        </div>
        {props.children}
      </div>
    );
  };
  return (
    <section className={classes.InvoiceStats}>
      <div className={classes.wrapper}>
        <Box
          style={{
            backgroundColor: darkTheme ? "#7b5cfa" : "#373B53",
            color: "white",
          }}
        >
          <p style={{ fontSize: "3rem", fontWeight: "bold" }}>
            {invoices.length}
          </p>
          <p style={{ fontSize: "0.65rem" }}>TOTAL INVOICES</p>
        </Box>
        <Box value={paidInvoices.length} status="PAID">
          <Bar
            trackLength={invoices.length}
            barLength={paidInvoices.length}
            category="paid"
          />
        </Box>
        <Box value={pendingInvoices.length} status="PENDING">
          <Bar
            trackLength={invoices.length}
            barLength={pendingInvoices.length}
            category="pending"
          />
        </Box>
        <Box value={draftInvoices.length} status="DRAFT">
          <Bar
            trackLength={invoices.length}
            barLength={draftInvoices.length}
            category="draft"
          />
        </Box>
      </div>
    </section>
  );
}

export default memo(InvoiceStatsTab);

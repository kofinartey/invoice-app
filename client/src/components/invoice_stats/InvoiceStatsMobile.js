import React, { useState, memo } from "react";
import { useSelector } from "react-redux";
//myimports
import Bar from "../bar/Bar";
import InvoiceStatsMobileStyles from "./InvoiceStatsMobileStyles";

function InvoiceStatsMobile() {
  const classes = InvoiceStatsMobileStyles();
  const darkTheme = useSelector((state) => state.theme);
  const invoices = useSelector((state) => state.invoice.invoices);
  const [expectedEarnings, setExpectedEarnings] = useState(0);
  const paidInvoices = invoices.filter((invoice) => invoice.status === "paid");
  const pendingInvoices = invoices.filter(
    (invoice) => invoice.status === "pending"
  );
  const draftInvoices = invoices.filter(
    (invoice) => invoice.status === "draft"
  );

  return (
    <section
      className={classes.invoiceStats}
      style={{ color: darkTheme && "white" }}
    >
      <div className={classes.wrapper}>
        <div
          className={classes.totalInvoices}
          style={{ backgroundColor: darkTheme && "#1E2139" }}
        >
          <p>{invoices.length}</p>
          <p>INVOICES</p>
        </div>
        <div className={classes.bars__wrapper}>
          <Bar
            trackLength={invoices.length}
            barLength={paidInvoices.length}
            category="paid"
          />
          <Bar
            trackLength={invoices.length}
            barLength={pendingInvoices.length}
            category="pending"
          />
          <Bar
            trackLength={invoices.length}
            barLength={draftInvoices.length}
            category="draft"
          />
        </div>
        <div className={classes.bar__label}>
          <p>({paidInvoices.length}) Paid</p>
          <p>({pendingInvoices.length}) Pending</p>
          <p>({draftInvoices.length}) Draft</p>
        </div>
      </div>
    </section>
  );
}

export default memo(InvoiceStatsMobile);

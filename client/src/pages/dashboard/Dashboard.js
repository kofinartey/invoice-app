import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
//my imports
import Bar from "../../components/bar/Bar";
import DashboardStyles from "./DashboardStyles";

function Dashboard() {
  const classes = DashboardStyles();
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
  //calculate expected earnings
  useEffect(() => {
    const calcExpected = () => {
      let total = 0;
      invoices.forEach((invoice) => {
        total += invoice.total;
      });
      setExpectedEarnings(total);
    };
    calcExpected();
  });

  return (
    <div className={classes.Dashboard}>
      {/* Invoices stats */}
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
      {/* Financial stats */}
      <section>
        <p>Earnings</p>
      </section>
      {/* Activity stats */}
      <section>
        <p>Activity</p>
      </section>
    </div>
  );
}

export default Dashboard;

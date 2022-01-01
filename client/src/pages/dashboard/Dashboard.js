import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from "recharts";
//my imports
// import { fetchInvoices } from "../../redux/invoice/invoiceActions";
import Card from "../../components/shared_components/Card";
import formatAmount from "../../helper_functions/formatAmount";
import InvoiceStatsMobile from "../../components/invoice_stats/InvoiceStatsMobile";
import InvoiceStatsTab from "../../components/invoice_stats/InvoiceStatsTab";
import DashboardStyles from "./DashboardStyles";

function Dashboard() {
  const classes = DashboardStyles();
  // const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme);
  const invoices = useSelector((state) => state.invoice.invoices);
  const currency = useSelector(
    (state) => state.user.userInfo.settings.currency
  );
  const [expectedEarnings, setExpectedEarnings] = useState(0);
  const [paidInvoices, setPaidInvoices] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  console.log("DASHBOARD MOUNTED");

  // useEffect(() => {
  //   dispatch(fetchInvoices());
  // });

  //calculate expected earnings
  useEffect(() => {
    const calcExpected = () => {
      let total = 0;
      let paid = 0;
      invoices.forEach((invoice) => {
        total += invoice.total;
        if (invoice.status === "paid") {
          paid += invoice.total;
        }
      });
      setExpectedEarnings(total);
      setPaidInvoices(paid);
    };
    calcExpected();
  }, [invoices]);

  //stuff for pie chart
  const chartColors = ["#39d69f", "#ff8f00"];
  const data = [
    {
      name: `${Math.round((paidInvoices / expectedEarnings) * 100)}% paid`,
      value: paidInvoices,
    },
    {
      name: `${Math.round(
        ((expectedEarnings - paidInvoices) / expectedEarnings) * 100
      )}% unpaid`,
      value: expectedEarnings - paidInvoices,
    },
  ];

  const overdue = (activity) => {
    return invoices.map((invoice) => {
      if (invoice.status === "pending") {
        const today = dayjs(new Date());
        let dueDate = dayjs(invoice.paymentDue);
        let dayDiff = dueDate.diff(today, "day");
        if (dayDiff < 0) {
          return (
            <Link
              to={`/invoice/${invoice._id}/${invoice.id}`}
              key={`overdue_${invoice.id}`}
            >
              <Card
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <p className={classes.id}>
                  <span>#</span>
                  {invoice.id}
                </p>
                <div className={classes.days}>
                  <p>{Math.abs(dayDiff)} days</p>
                  <p>overdue</p>
                </div>
                <p className={classes.invoice__amount}>
                  {currency} {formatAmount(invoice.total)}
                </p>
              </Card>
            </Link>
          );
        } else return null;
      }
    });
  };
  const upcoming = () => {
    return invoices.map((invoice) => {
      if (invoice.status === "pending") {
        const today = dayjs(new Date());
        let dueDate = dayjs(invoice.paymentDue);
        let dayDiff = dueDate.diff(today, "day");
        if (dayDiff > 0 && dayDiff < 14) {
          return (
            <Link
              to={`/invoice/${invoice._id}/${invoice.id}`}
              key={`overdue_${invoice.id}`}
            >
              <Card
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <p className={classes.id}>
                  <span>#</span>
                  {invoice.id}
                </p>
                <p>{invoice.paymentDue}</p>
                <p className={classes.invoice__amount}>
                  {currency} {formatAmount(invoice.total)}
                </p>
              </Card>
            </Link>
          );
        }
      } else return null;
    });
  };

  // const y = () => {
  //   return invoices.map();
  // };

  return (
    <div className={classes.Dashboard}>
      {/* Invoices stats */}
      {windowWidth < 768 ? <InvoiceStatsMobile /> : <InvoiceStatsTab />}

      {/* Financial stats */}
      <section className={classes.finances}>
        <div className={classes.finances__wrapper}>
          <div className={classes.stats}>
            <div className={classes.finances__total}>
              <div className={`${classes.quote} ${classes.expected}`}>
                <p>Expected Earnings</p>
                <p>
                  {currency} {formatAmount(expectedEarnings)}
                </p>
              </div>
            </div>

            <div className={classes.finances__others}>
              <div className={`${classes.quote} ${classes.paid}`}>
                <p>Paid Invoices</p>
                <p>
                  {currency} {formatAmount(paidInvoices)}
                </p>
              </div>

              <div className={`${classes.quote} ${classes.unpaid}`}>
                <p>Unpaid Invoices</p>
                <p>
                  {currency} {formatAmount(expectedEarnings - paidInvoices)}
                </p>
              </div>
            </div>
          </div>

          <div className={classes.chart}>
            <ResponsiveContainer
              width={windowWidth < 768 ? "100%" : "100%"}
              height={300}
            >
              <PieChart width={220} height={350}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  fill="#8884d8"
                  innerRadius="70%"
                  paddingAngle={6}
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell
                      fill={chartColors[index % chartColors.length]}
                      key={index}
                    />
                  ))}
                </Pie>
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
      {/* Activity stats */}
      <section
        className={classes.activities}
        style={{ color: darkTheme && "white" }}
      >
        <div className={classes.activities__wrapper}>
          {/* overdue invoices */}
          <div className={classes.overdue}>
            <p>Overdue Invoices</p>
            {overdue()}
          </div>

          {/* upcoming payments*/}
          <div className={classes.incoming}>
            <p>Upcoming Payments</p>
            {upcoming()}
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(Dashboard);

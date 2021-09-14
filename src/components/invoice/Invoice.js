import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import formatAmount from "../../helper_functions/formatAmount";

import InvoiceStyles from "./InvoiceStyles";
import arrowRight from "../../assets/icon-arrow-right.svg";
import StatusCard from "../shared_components/StatusCard";

function Invoice({ data }) {
  const classes = InvoiceStyles();
  const darkTheme = useSelector((state) => state.theme);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    let width = window.innerWidth;
    setWindowWidth(width);
  });

  //add commas to amount

  //// ***** MAIN FUNCTION RENDER ******
  return (
    <Link
      to={`/invoice/${data.id}`}
      className={classes.Invoice}
      style={{
        backgroundColor: darkTheme && "#1E2139",
        color: darkTheme && "white",
      }}
    >
      <h5 className={classes.id}>
        <span>#</span>
        {data.id}
      </h5>
      <p className={classes.clientName}>{data.clientName}</p>
      <p className={classes.date}>Due {data.paymentDue}</p>
      <h4 className={classes.amount}>
        £{data.total && formatAmount(data.total.toFixed(2))}
      </h4>

      <div className={classes.status}>
        <StatusCard status={data.status}>{data.status}</StatusCard>
      </div>
      {windowWidth > 768 && (
        <div className={classes.arrowRight}>
          <img src={arrowRight} alt="" />
        </div>
      )}
    </Link>
  );
}

export default Invoice;

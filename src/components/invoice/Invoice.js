import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InvoiceStyles from "./InvoiceStyles";
import arrowRight from "../../assets/icon-arrow-right.svg";

function Invoice({ data }) {
  const classes = InvoiceStyles();
  const darkTheme = useSelector((state) => state.theme);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    let width = window.innerWidth;
    setWindowWidth(width);
  });

  const capitalize = (word) => {
    return word && word[0].toUpperCase() + word.slice(1);
  };
  //add commas to amount
  const formatAmount = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //// ***** MAIN FUNCTION RENDER ******
  return (
    <Link
      to="#"
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
      <h4 className={classes.amount}>£{formatAmount(data.total.toFixed(2))}</h4>

      <div
        className={classes.status}
        style={{
          color:
            data.status === "paid"
              ? "rgba(57,214,159, 1)"
              : data.status === "pending"
              ? "rgba(255,143,0,1)"
              : darkTheme
              ? "rgb(237, 227, 250)"
              : data.status === "draft"
              ? "hsl(231, 20%,27%)"
              : null,
          backgroundColor:
            data.status === "paid"
              ? "rgba(57,214,159, 0.1)"
              : data.status === "draft"
              ? "rgba(100,100,150,0.1)"
              : null,
        }}
      >
        <div
          className={classes.status__dot}
          style={{
            backgroundColor:
              data.status === "paid"
                ? "hsl(160,67%,52%)"
                : data.status === "pending"
                ? "rgba(255,143,0,1)"
                : darkTheme
                ? "rgb(237, 227, 250)"
                : data.status === "draft"
                ? "hsl(231, 20%,27%)"
                : null,
          }}
        ></div>
        <h5>{capitalize(`${data.status}`)}</h5>
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

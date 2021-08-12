import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InvoiceList from "../invoice_list/InvoiceList";
import Filters from "../filters/Filters";
import { showForm } from "../../redux/form_display/formDisplayAction";

import arrowDown from "../../assets/icon-arrow-down.svg";
import plus from "../../assets/icon-plus.svg";
import MainPageStyles from "./MainPageStyles.js";

function MainPage() {
  const classes = MainPageStyles();
  const darkTheme = useSelector((state) => state.theme);
  const invoiceData = useSelector((state) => state.invoice);
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    let width = window.innerWidth;
    setWindowWidth(width);
  });

  const [filters, setFilters] = useState({
    draft: false,
    pending: false,
    paid: false,
  });

  const toggleFilter = (selectedFilter) => {
    console.log("toggle filter called");
    console.log();
    setFilters((curState) => ({
      ...curState,
      [selectedFilter]: !curState[selectedFilter],
    }));
  };

  return (
    <div
      className={classes.MainPage}
      // style={{ color: darkTheme && "white" }}
    >
      <div className={classes.wrapper}>
        <div className={classes.top}>
          <div className={classes.top__left}>
            <h4 style={{ color: darkTheme && "white" }}>Invoices</h4>
            <p style={{ color: darkTheme && "white" }}>
              {windowWidth < 768
                ? `${invoiceData.length} invoices`
                : `There are ${invoiceData.length}  total invoices`}
            </p>
          </div>
          <div className={`${classes.top__right}`}>
            {/* ...filter */}
            <Filters filters={filters} toggleFilter={toggleFilter} />
            {/* ...add new invoice */}
            <div
              className={classes.new__invoice}
              onClick={() => {
                dispatch(showForm());
              }}
            >
              <div className={classes.icon__container}>
                <img src={plus} alt="new invoice" />
              </div>
              <h5>{windowWidth < 768 ? "New" : "New Invoice"}</h5>
            </div>
          </div>
        </div>

        {/* List goes Heere */}
        <div className={classes.list__container}>
          <InvoiceList />
        </div>
      </div>
    </div>
  );
}

export default MainPage;

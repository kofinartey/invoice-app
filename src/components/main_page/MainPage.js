import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import InvoiceList from "../invoice_list/InvoiceList";
import Filters from "../filters/Filters";
import { showForm } from "../../redux/form_display/formDisplayAction";
import plus from "../../assets/icon-plus.svg";
import MainPageStyles from "./MainPageStyles.js";

const listVariants = {
  hidden: {
    x: -1000,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: { type: "tween", duration: 0.5 },
  },
  exit: {
    x: -1000,
    transition: { ease: "easeInOut", duration: 0.1 },
  },
};

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
    setFilters((curState) => ({
      draft: false,
      pending: false,
      paid: false,
      [selectedFilter]: !curState[selectedFilter],
    }));
  };

  return (
    <motion.div
      className={classes.MainPage}
      variants={listVariants}
      initial="hidden"
      animate="show"
      exit="exit"

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
        <motion.div className={classes.list__container}>
          <InvoiceList filters={filters} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default MainPage;

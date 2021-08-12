import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../shared_components/Card";
import { CheckInput } from "../shared_components/FormElements";
import arrowDown from "../../assets/icon-arrow-down.svg";
import FiltersStyles from "./FiltersStyles";

function Filters(props) {
  const darkTheme = useSelector((state) => state.theme);
  const [open, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    let width = window.innerWidth;
    setWindowWidth(width);
  });
  const classes = FiltersStyles();
  //   if (open) {
  //     document.body.addEventListener("click", () => {
  //       setOpen(!open);
  //     });
  //   } else {
  //       document.body.removeEventListener*
  //   }
  const handleClick = () => {
    setOpen(!open);
  };

  const checkFilter = (e) => {
    console.log(e.target.name);
    props.toggleFilter(e.target.name);
  };

  return (
    <div className={classes.filter} style={{ color: darkTheme && "white" }}>
      <div className={classes.filter__toggler} onClick={handleClick}>
        <h5>{windowWidth < 768 ? "Filter" : "Filter by status"}</h5>
        <img
          src={arrowDown}
          alt="filter button"
          style={{
            transform: open && "rotate(180deg)",
            transition: "all .3s ease-in-out",
          }}
        />
      </div>

      <div
        className={classes.dropDown}
        style={{ opacity: open && "1", pointerEvents: open ? "all" : "none" }}
      >
        <Card
          style={{
            boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
          }}
        >
          <div className={classes.dropDown__items}>
            <CheckInput
              name="draft"
              label="Draft"
              onClick={checkFilter}
              filters={props.filters}
            />

            <CheckInput
              name="pending"
              label="Pending"
              onClick={checkFilter}
              filters={props.filters}
            />
            <CheckInput
              name="paid"
              label="Paid"
              onClick={checkFilter}
              filters={props.filters}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Filters;

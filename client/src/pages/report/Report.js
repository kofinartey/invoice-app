import React from "react";
import { useHistory } from "react-router";

//my imports
import ReportStyles from "./ReportStyles";
import Input from "../../components/shared_components/Input";
import { StyledLabel } from "../../components/shared_components/FormElements";
import Button from "../../components/shared_components/Button";
import { Link } from "react-router-dom";
import leftArrow from "../../assets/icon-arrow-left.svg";

function Report() {
  const classes = ReportStyles();
  const history = useHistory();
  return (
    <div className={classes.Report}>
      <div className={classes.wrapper}>
        <Link to="/main" className={classes.back}>
          <img src={leftArrow} alt="" /> Back to Invoices
        </Link>
        <h1 className={classes.heading}>Report a problem here</h1>
        <form className={classes.form}>
          <Input type="text" inputId="title" label="Title" />
          <StyledLabel>Describe your problem below</StyledLabel>
          <textarea className={classes.textarea} />
          <Button color="white" background="#7b5cfa">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Report;

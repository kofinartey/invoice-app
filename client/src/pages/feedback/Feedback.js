import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
//my imports
import FeedbackStyles from "./FeedBackStyles";
import Card from "../../components/shared_components/Card";
import { StyledLabel } from "../../components/shared_components/FormElements";
import Select from "../../components/shared_components/Select";
import Button from "../../components/shared_components/Button";
import leftArrow from "../../assets/icon-arrow-left.svg";
import LibraryAddCheckRoundedIcon from "@mui/icons-material/LibraryAddCheckRounded";

function Feedback() {
  const classes = FeedbackStyles();
  const darkTheme = useSelector((state) => state.theme);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [feedKind, setFeedKind] = useState("General Feedback");
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log(status);
  }, [status]);

  const sendFeedback = async (feedback) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/feedback/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify(feedback),
        }
      );
      const data = await response.json();
      setStatus(data);
      setSuccess(true);
      setTimeout(() => {
        setStatus("");
        setSuccess(false);
        reset();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const changeType = (e) => {
    setFeedKind(e.target.value);
  };

  const submitFeedback = (data) => {
    let toSend = { ...data, kind: feedKind };
    sendFeedback(toSend);
  };

  const inputStyle = {
    color: darkTheme && "white",
    background: darkTheme && "#252945",
    borderColor: darkTheme && "#252945",
  };
  const SuccessModal = () => {
    return (
      <motion.div className={classes.successModal}>
        <motion.div
          className={classes.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className={classes.modal__content}>
            <Card>
              <div className={classes.modal__wrapper}>
                <LibraryAddCheckRoundedIcon color="secondary" />
                <p>Feedback sent</p>
                <p>Thank you for making the app better</p>
              </div>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className={classes.Feedback}>
      {success && <SuccessModal />}
      <Link
        to="/main"
        className={classes.back}
        style={{ color: darkTheme && "white" }}
      >
        <img src={leftArrow} alt="" /> Back to Invoices
      </Link>
      <Card>
        <div className={classes.wrapper}>
          <form
            onSubmit={handleSubmit(submitFeedback)}
            className={classes.form}
          >
            <div className={classes.formControl}>
              <Select label="Kind" onChange={changeType}>
                <option default>General Feedback</option>
                <option value="Bug report">Bug Report</option>
                <option value="suggestion">Suggestion</option>
                <option value="other">Other</option>
              </Select>
            </div>
            <div className={classes.formControl}>
              <StyledLabel>Title</StyledLabel>
              <input
                type="text"
                className={classes.input}
                style={inputStyle}
                {...register("title", { required: true })}
              />
              <p className={classes.errors}>
                {errors.title && "Can't be empty"}
              </p>
            </div>

            <div className={classes.formControl}>
              <StyledLabel>Describe your below</StyledLabel>
              <textarea
                className={classes.textarea}
                style={inputStyle}
                {...register("description", { required: true })}
              />
              <p className={classes.errors}>
                {errors.description && "Can't be empty"}
              </p>
            </div>
            {status && <p>{status}</p>}
            <Button color="white" background="#7b5cfa">
              SEND
            </Button>
            <Button
              color="black"
              background={darkTheme ? "white" : "rgba(0,0,0,0.1)"}
              onClick={(e) => {
                e.preventDefault();
                reset();
              }}
            >
              CANCEL
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default Feedback;

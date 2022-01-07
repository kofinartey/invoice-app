import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addAvatar } from "../../redux/auth/authActions";
import { Card } from "@mui/material";
import Button from "../shared_components/Button";
import SelectImageStyles from "./SelectImageStyles";

function SelectImage({ toggle }) {
  const classes = SelectImageStyles();
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");

  const handleChange = (e) => {
    try {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    } catch (err) {
      setFile("");
      setFileName("Choose File");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    if (!file) return;
    dispatch(addAvatar(formData));
    toggle(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.modal}>
        <Card>
          <form
            className={classes.form}
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <label htmlFor="choose" className={classes.label}>
              <div>
                {fileName}
                <p>Browse</p>
              </div>
            </label>
            <input
              type="file"
              className={classes.choose}
              id="choose"
              onChange={handleChange}
            />
            <div className={classes.button__section}>
              <Button
                className={classes.button}
                color="white"
                background="#7C5DFA"
              >
                UPLOAD IMAGE
              </Button>
              <Button
                onClick={() => {
                  toggle(false);
                }}
                background="#ec5757 "
                color="white"
              >
                CANCEL
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default SelectImage;

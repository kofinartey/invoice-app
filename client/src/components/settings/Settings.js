import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
//my imports
import Button from "../shared_components/Button";
import Card from "../shared_components/Card";
import Input from "../shared_components/Input";
import Select from "../shared_components/Select";
import { Divider } from "@material-ui/core";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import SettingsStyles from "./SettingsStyles";

function Settings() {
  const classes = SettingsStyles();
  const history = useHistory();
  const darkTheme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user.userInfo);
  const invoices = useSelector((state) => state.invoice.invoices);
  const paid = invoices.filter((invoice) => invoice.status === "paid");
  const pending = invoices.filter((invoice) => invoice.status === "pending");

  return (
    <div
      className={classes.Settings}
      style={{
        color: darkTheme && "white",
      }}
    >
      <div className={classes.wrapper}>
        <p onClick={() => history.goBack()}>Go back</p>
        <section className={classes.profile}>
          <Card
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p className={classes.group__heading}>Profile</p>
            <div className={classes.profile_pic}>
              <p>{user.name[0].toUpperCase()}</p>
            </div>
            <p className={classes.userName}>{user.name}</p>
            <div className={classes.invoice__summary}>
              <div className={classes.summary__item}>
                <p>{invoices.length}</p>
                <p>Invoices</p>
              </div>
              <div className={classes.summary__item}>
                <p>{paid.length}</p>
                <p>Paid</p>
              </div>
              <div className={classes.summary__item}>
                <p>{pending.length}</p>
                <p>Pending</p>
              </div>
            </div>
            <button className={classes.profile__btn}>UPLOAD NEW AVATAR</button>
            <button
              className={classes.profile__btn}
              style={{ backgroundColor: darkTheme && "#252945" }}
            >
              DELETE
            </button>
          </Card>
        </section>
        <section className={classes.settings__main}>
          <p className={classes.group__heading}>Basic Info</p>
          <Card>
            <div className={classes.basic__info}>
              <Input type="text" label="First Name" />
              <Input type="text" label="Last Name" />
              <Input type="text" label="Email" />
            </div>
          </Card>

          <p className={classes.group__heading}>Preferences</p>
          <Card>
            <div className={classes.preferences__unit}>
              <p>Theme</p>
              <p>switch</p>
            </div>
            <Divider />
            <div className={classes.preferences__unit}>
              <p>Currency</p>
              <Select>
                <option value="$">Dollar</option>
                <option value="€">Euro</option>
                <option value="£">Pound</option>
                <option value="¢">Cedi</option>
              </Select>
            </div>
          </Card>

          <p className={classes.group__heading}>Account Actions</p>
          <Card>
            <div className={classes.password}>
              <p>Change Password</p>
              <div>
                <Input type="password" label="Enter Current Password" />
                <Input type="password" label="Enter New Password" />
                <Input type="password" label="Confirm New Password" />
              </div>
            </div>
            <div className={classes.delete__account}>
              <p>Delete All Invoices</p>
              <button
                className={`${classes.profile__btn} ${classes.delete__btn}`}
              >
                <WarningRoundedIcon />
                <p>DELETE</p>
              </button>
            </div>
            <Divider />
            <div className={classes.delete__account}>
              <p>Delete Account</p>
              <button
                className={`${classes.profile__btn} ${classes.delete__btn}`}
                style={{ backgroundColor: "#EC5757" }}
              >
                <WarningRoundedIcon />
                <p>DELETE</p>
              </button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default Settings;

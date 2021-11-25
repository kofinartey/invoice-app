//package imports
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { config } from "dotenv";
//my imports
import ChangePasswordForm from "./ChangePassword";
import SelectImage from "./SelectImage";
import {
  editUserInfo,
  changeCurrency,
  removeAvatar,
} from "../../redux/auth/authActions";
import { switchTheme } from "../../redux/theme/themeAction";
import { infoSchema } from "./settingsSchema";
import DeleteModal from "./DeleteModal";
import Card from "../shared_components/Card";
import Input from "../shared_components/Input";
import Select from "../shared_components/Select";
import { Divider, Switch } from "@material-ui/core";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import leftArrow from "../../assets/icon-arrow-left.svg";
import SettingsStyles from "./SettingsStyles";

function Settings() {
  config();
  const classes = SettingsStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user.userInfo);
  const userName = `${user.firstName} ${user.lastName}`;
  const currency = user.settings.currency;
  const invoices = useSelector((state) => state.invoice.invoices);
  const paid = invoices.filter((invoice) => invoice.status === "paid");
  const pending = invoices.filter((invoice) => invoice.status === "pending");
  const [checked, setChecked] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [modal, setModal] = useState({
    visible: false,
    type: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(infoSchema),
  });

  //change theme checker based on current theme
  useEffect(() => {
    if (darkTheme) setChecked(true);
    else setChecked(false);
  }, [darkTheme]);

  const toggleModal = (modalType) => {
    setModal({
      visible: !modal.visible,
      type: modalType,
    });
  };
  const cancelModal = () => {
    setModal({
      visible: !modal.visible,
      type: "",
    });
  };

  const sumbitBasicInfo = (data) => {
    dispatch(editUserInfo(data));
  };

  const handleCurrency = (e) => {
    dispatch(changeCurrency(e.target.value));
  };

  const deleteAvatar = () => {
    dispatch(removeAvatar());
  };

  return (
    <div
      className={classes.Settings}
      style={{
        color: darkTheme && "white",
      }}
    >
      {/* conditionally render modal for delete actions */}
      {modal.visible && (
        <DeleteModal
          toggleModal={toggleModal}
          cancelModal={cancelModal}
          modal={modal}
          id={user._id}
        />
      )}
      {/* conditionally render image selection modals */}
      {showImageSelector && <SelectImage toggle={setShowImageSelector} />}

      <div className={classes.goBack} onClick={() => history.push("/main")}>
        <img src={leftArrow} alt="" />
        <p>Go back</p>
      </div>

      <div className={classes.wrapper}>
        {/* profile section */}
        <section className={classes.profile}>
          <p
            className={classes.group__heading}
            style={{ color: darkTheme && "white" }}
          >
            Profile
          </p>
          <Card
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              className={classes.profile_pic}
              style={{ borderColor: darkTheme && "#7C5DFA" }}
            >
              {user.avatar ? (
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/users${user.avatar}`}
                  alt=""
                />
              ) : (
                <p>{userName[0].toUpperCase()}</p>
              )}
            </div>
            <p className={classes.userName}>{userName}</p>
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

            <button
              className={classes.profile__btn}
              onClick={() => {
                setShowImageSelector(true);
              }}
            >
              {" "}
              UPLOAD NEW AVATAR
            </button>
            <button
              className={classes.profile__btn}
              style={{ backgroundColor: darkTheme && "#252945" }}
              onClick={deleteAvatar}
            >
              DELETE
            </button>
          </Card>
        </section>

        {/* divides profile and settings at 1080px and above */}
        <div className={classes.vertical__divider}></div>

        <section className={classes.settings__main}>
          <p
            className={classes.group__heading}
            style={{ color: darkTheme && "white" }}
          >
            Basic Info
          </p>
          <Card>
            <form
              className={classes.basic__info}
              onSubmit={handleSubmit(sumbitBasicInfo)}
            >
              <div>
                <Input
                  type="text"
                  label="First Name"
                  inputid="firstName"
                  value={user.firstName}
                  {...register("firstName")}
                  errors={errors.firstName?.message}
                />
              </div>
              <div>
                <Input
                  type="text"
                  label="Last Name"
                  inputid="lastName"
                  value={user.lastName}
                  {...register("lastName")}
                  errors={errors.lastName?.message}
                />
              </div>
              <div>
                <Input
                  type="text"
                  label="Email"
                  inputid="email"
                  value={user.email}
                  {...register("email")}
                  errors={errors.email?.message}
                />
              </div>
              <button
                className={classes.profile__btn}
                style={{ backgroundColor: darkTheme && "#252945" }}
              >
                Save changes
              </button>
            </form>
          </Card>

          <p
            className={classes.group__heading}
            style={{ color: darkTheme && "white" }}
          >
            Preferences
          </p>
          <Card>
            <div className={classes.preferences__unit}>
              <p>Theme</p>
              <div className={classes.themeSwitch}>
                <p>Light</p>
                <Switch
                  checked={checked}
                  onChange={() => {
                    dispatch(switchTheme());
                  }}
                />
                <p>Dark</p>
              </div>
            </div>
            <Divider />
            <div className={classes.preferences__unit}>
              <p>Currency</p>
              <p>{currency}</p>
              <Select value={currency} onChange={handleCurrency}>
                <option value="$">Dollar</option>
                <option value="€">Euro</option>
                <option value="£">Pound</option>
                <option value="¢">Cedi</option>
              </Select>
            </div>
          </Card>

          <p
            className={classes.group__heading}
            style={{ color: darkTheme && "white" }}
          >
            Account Actions
          </p>
          <Card style={{ marginBottom: "10rem" }}>
            <ChangePasswordForm />
            <Divider style={{ margin: "5rem 0  5rem 0" }} />

            <div className={classes.delete__account}>
              <p style={{ color: darkTheme ? "white" : "black" }}>
                Delete All Invoices
              </p>
              <button
                className={`${classes.profile__btn} ${classes.delete__btn}`}
                onClick={() => {
                  toggleModal("deleteInvoices");
                }}
              >
                <WarningRoundedIcon />
                <p>DELETE</p>
              </button>
            </div>

            <div className={classes.delete__account}>
              <p>Delete Account</p>
              <button
                onClick={() => toggleModal("deleteAccount")}
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

//move change password form out of main settings component.
//it was causing a few issues with how react hook form handles both it and the edit userInfo form
// const ChangePasswordForm = () => {
//   const classes = SettingsStyles();
//   const darkTheme = useSelector((state) => state.theme);
//   const dispatch = useDispatch();
//   const defaultValues = {
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   };
//   const {
//     handleSubmit,
//     reset,
//     register,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(passwordSchema),
//   });
//   const [changingStatus, setChangingStatus] = useState({
//     loading: false,
//     message: "",
//     visible: false,
//   });

//   const submitPassword = (data) => {
//     dispatch(changePassword(data, setChangingStatus, reset));
//     reset();
//   };
//   return (
//     <div className={classes.password}>
//       <p>Change Password</p>
//       <form onSubmit={handleSubmit(submitPassword)}>
//         <Input
//           type="password"
//           inputid="currentPassword"
//           label="Enter Current Password"
//           {...register("currentPassword")}
//           errors={errors.currentPassword?.message}
//         />
//         <Input
//           type="password"
//           inputid="newPassword"
//           label="Enter New Password"
//           {...register("newPassword")}
//           errors={errors.newPassword?.message}
//         />
//         <Input
//           type="password"
//           inputid="confirmPassword"
//           label="Confirm New Password"
//           {...register("confirmPassword")}
//           errors={errors.confirmPassword && "Passwords don't match"}
//         />
//         <p style={{ fontSize: "0.8rem", color: "#ec5757" }}>
//           {changingStatus.visible && `*** ${changingStatus.message}`}
//         </p>
//         <button
//           className={classes.profile__btn}
//           style={{ backgroundColor: darkTheme && "#252945" }}
//         >
//           CHANGE PASSWORD
//         </button>
//       </form>
//     </div>
//   );
// };

export default Settings;

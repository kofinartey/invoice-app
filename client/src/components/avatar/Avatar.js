//package imports
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useHistory } from "react-router-dom";
//my imports
import { logout } from "../../redux/auth/authActions";
import { switchTheme } from "../../redux/theme/themeAction";
import avatar from "../../assets/image-avatar.jpg";
import Card from "../shared_components/Card";
import AvatarStyles from "./AvatarStyles";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import FeedbackIcon from "@mui/icons-material/Feedback";
import HelpIcon from "@mui/icons-material/Help";
import Divider from "@mui/material/Divider";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";

const DropDownMenu = (props) => {
  const classes = AvatarStyles();
  const darkTheme = useSelector((state) => state.theme);
  return (
    <motion.div
      className={classes.DropDownMenu}
      style={{ color: darkTheme && "white" }}
    >
      <Card style={{ boxShadow: "0 0 30px rgba(0,0,0,0.3)" }}>
        {props.children}
      </Card>
    </motion.div>
  );
};

const DropDownItem = (props) => {
  const classes = AvatarStyles();

  return (
    <div className={classes.DropDownItem} onClick={props.onClick}>
      <span>{props.leftIcon}</span>
      <p>{props.children}</p>
      <span>{props.rightIcon}</span>
    </div>
  );
};

function Avatar() {
  const classes = AvatarStyles();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState("main");
  const user = useSelector((state) => state.user.userInfo);
  const userName = `${user.firstName} ${user.lastName}`;
  const darkTheme = useSelector((state) => state.theme);
  const history = useHistory();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setOpen(!open);
    setMenu("main");
  };

  const signOut = () => {
    dispatch(logout(history));
  };

  const DefaultAvatar = () => {
    return (
      <div className={classes.avatar__default} onClick={toggleMenu}>
        {user.avatar ? (
          <img
            src={`${process.env.REACT_APP_USER_BASE_URL}${user.avatar}`}
            alt=""
          />
        ) : (
          <p>{user.firstName[0].toUpperCase()}</p>
        )}
      </div>
    );
  };
  return (
    <div className={classes.Avatar}>
      {user.image ? (
        <img
          className={classes.avatar_img}
          src={avatar}
          alt="avatar"
          onClick={toggleMenu}
        />
      ) : (
        <DefaultAvatar />
      )}

      <div>
        {open && (
          <>
            <div
              className={classes.overlay}
              onClick={() => {
                setOpen(!open);
              }}
            ></div>
            <DropDownMenu>
              {/* main menu */}
              {menu === "main" && (
                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  exit={{ x: 100 }}
                  style={{ overflowX: "hidden" }}
                >
                  <div className={classes.username}>
                    <div>
                      <p>{userName}</p>
                      <small>{user.email}</small>
                    </div>
                    <DefaultAvatar />
                  </div>
                  <Divider
                    style={{ color: darkTheme && "red", marginTop: "0.5rem" }}
                  />
                  <Link
                    to="/settings"
                    style={{ color: darkTheme ? "white" : "black" }}
                    onClick={toggleMenu}
                  >
                    <DropDownItem text="Settings" leftIcon={<SettingsIcon />}>
                      Settings
                    </DropDownItem>
                  </Link>
                  <Divider />
                  <DropDownItem
                    leftIcon={<HelpCenterIcon />}
                    rightIcon={<ArrowRightIcon />}
                    onClick={() => {
                      setMenu("help");
                    }}
                  >
                    Help and Support
                  </DropDownItem>
                  <Divider />
                  <DropDownItem
                    leftIcon={darkTheme ? <WbSunnyIcon /> : <ModeNightIcon />}
                    onClick={() => {
                      dispatch(switchTheme());
                    }}
                  >
                    {darkTheme ? "Light Mode" : "Dark Mode"}
                  </DropDownItem>
                  <DropDownItem leftIcon={<LogoutIcon />} onClick={signOut}>
                    Sign Out
                  </DropDownItem>
                </motion.div>
              )}
              {/* Help Menu */}
              {menu === "help" && (
                <AnimatePresence>
                  <motion.div
                    // key="help"
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    exit={{ x: 100 }}
                  >
                    <DropDownItem
                      leftIcon={<ArrowBackIcon />}
                      onClick={() => setMenu("main")}
                    />
                    <Divider />
                    <Link
                      to="/feedback"
                      style={{ color: darkTheme ? "white" : "black" }}
                      onClick={toggleMenu}
                    >
                      <DropDownItem leftIcon={<FeedbackIcon />}>
                        Feedback
                      </DropDownItem>
                    </Link>
                    <Divider />

                    <DropDownItem leftIcon={<HelpIcon />}>
                      Help Center
                    </DropDownItem>
                  </motion.div>
                </AnimatePresence>
              )}
            </DropDownMenu>
          </>
        )}
      </div>
    </div>
  );
}

export default Avatar;

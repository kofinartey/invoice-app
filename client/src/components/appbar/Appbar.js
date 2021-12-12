import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//my imports
import { switchTheme } from "../../redux/theme/themeAction";
import Avatar from "../avatar/Avatar";
import AppbarStyles from "./AppbarStyles";
import { IconButton } from "@material-ui/core";
import logo from "../../assets/logo.svg";
import sun from "../../assets/icon-sun.svg";
import moon from "../../assets/icon-moon.svg";
import AssessmentIcon from "@mui/icons-material/Assessment";

function Appbar(props) {
  const classes = AppbarStyles();
  const darkTheme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const changeTheme = () => {
    dispatch(switchTheme());
  };

  return (
    <div
      className={classes.Appbar}
      style={{ backgroundColor: darkTheme && "hsl(233, 30%, 21%)" }}
    >
      <Link to="/main" className={classes.logo__container}>
        <img src={logo} alt="logo" />
      </Link>
      <Link to="/dashboard">
        <AssessmentIcon
          sx={{
            color: "#7E88C3",
            width: "2rem",
            height: "3rem",
            cursor: "pointer",
          }}
        />
      </Link>

      <div className={classes.theme__user}>
        <div className={classes.container}>
          <IconButton onClick={changeTheme}>
            <img src={darkTheme ? sun : moon} alt="Theme switch" />
          </IconButton>
        </div>
        <div className={classes.divider}></div>
        <div className={classes.container}>
          <Avatar />
        </div>
      </div>
    </div>
  );
}

export default Appbar;

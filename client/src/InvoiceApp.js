//package imports
import React, { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";
//my imports
import { fetchInvoices } from "./redux/invoice/invoiceActions";
import InvoiceAppStyles from "./InvoiceAppStyles";
import Login from "./components/auth/Auth";
import Appbar from "./components/appbar/Appbar";
import MainPage from "./components/main_page/MainPage";
import Notification from "./components/notification/Notification";
import InvoiceDetails from "./components/invoice_details/InvoiceDetails";
import Settings from "./components/settings/Settings";
import Feedback from "./pages/feedback/Feedback";

function InvoiceApp() {
  const classes = InvoiceAppStyles();
  const darkTheme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const location = useLocation();
  const notificationDisplay = useSelector(
    (state) => state.invoice.notifications.visible
  );

  //load invoices when login is successful
  useEffect(() => {
    if (location.pathname === "/main") {
      dispatch(fetchInvoices());
    }
  });

  return (
    <div
      className={classes.InvoiceApp}
      style={{ backgroundColor: darkTheme ? "#141625" : "#F8F8FB " }}
    >
      {/* Remove appbar from login/signup page */}
      {location.pathname !== "/" && (
        <nav className={classes.Appbar}>
          <Appbar />
        </nav>
      )}
      <AnimatePresence>
        <Switch location={location} key={location.key}>
          <Route exact path="/" render={() => <Login />} />
          <Route exact path="/main" render={() => <MainPage />} />
          <Route
            exact
            path="/invoice/:_id/:id"
            render={(routeProps) => <InvoiceDetails {...routeProps} />}
          />
          <Route exact path="/settings" render={() => <Settings />} />
          <Route exact path="/feedback" render={() => <Feedback />} />
        </Switch>
      </AnimatePresence>
      <div className={classes.notification}>
        {notificationDisplay && <Notification />}
      </div>
      {/* <InvoiceForm /> */}
    </div>
  );
}

export default InvoiceApp;

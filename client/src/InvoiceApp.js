//package imports
import React, { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";
//my imports
import { fetchInvoices } from "./redux/invoice/invoiceActions";
import Appbar from "./components/appbar/Appbar";
import InvoiceAppStyles from "./InvoiceAppStyles";
import MainPage from "./components/main_page/MainPage";
import Notification from "./components/notification/Notification";
import InvoiceDetails from "./components/invoice_details/InvoiceDetails";

function InvoiceApp() {
  const classes = InvoiceAppStyles();
  const darkTheme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const location = useLocation();
  const notificationDisplay = useSelector(
    (state) => state.invoice.notifications.visible
  );

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);
  return (
    <div
      className={classes.InvoiceApp}
      style={{ backgroundColor: darkTheme ? "#141625" : "#F8F8FB " }}
    >
      <nav className={classes.Appbar}>
        <Appbar />
      </nav>
      <AnimatePresence>
        <Switch location={location} key={location.key}>
          <Route exact path="/" render={() => <MainPage />} />
          <Route
            exact
            path="/invoice/:id"
            render={(routeProps) => (
              <InvoiceDetails id={routeProps.match.params.id} {...routeProps} />
            )}
          />
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

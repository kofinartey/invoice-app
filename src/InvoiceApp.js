import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import Appbar from "./components/appbar/Appbar";
import InvoiceAppStyles from "./InvoiceAppStyles";
import MainPage from "./components/main_page/MainPage";
import Notification from "./components/notification/Notification";
import InvoiceDetails from "./components/invoice_details/InvoiceDetails";

function InvoiceApp() {
  const classes = InvoiceAppStyles();
  const darkTheme = useSelector((state) => state.theme);
  const location = useLocation();

  return (
    <div
      className={classes.InvoiceApp}
      style={{ backgroundColor: darkTheme ? "#141625" : "#F8F8FB " }}
    >
      <div className={classes.Appbar}>
        <Appbar />
      </div>
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
        <Notification />
      </AnimatePresence>

      {/* <InvoiceForm /> */}
    </div>
  );
}

export default InvoiceApp;

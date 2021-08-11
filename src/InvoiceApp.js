import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import NewInvoice from "./components/new_invoice/NewInvoice";
import Appbar from "./components/appbar/Appbar";
import InvoiceAppStyles from "./InvoiceAppStyles";
import MainPage from "./components/main_page/MainPage";
import InvoiceDetails from "./components/invoice_details/InvoiceDetails";

function InvoiceApp() {
  const classes = InvoiceAppStyles();
  const darkTheme = useSelector((state) => state.theme);

  return (
    <Router>
      <div
        className={classes.InvoiceApp}
        style={{ backgroundColor: darkTheme ? "#141625" : "#F8F8FB " }}
      >
        <div className={classes.Appbar}>
          <Appbar />
        </div>
        <Switch>
          <Route exact path="/" render={() => <MainPage />} />
          <Route
            exact
            path="/invoice/:id"
            render={(routeProps) => (
              <InvoiceDetails id={routeProps.match.params.id} {...routeProps} />
            )}
          />
        </Switch>

        <NewInvoice />
      </div>
    </Router>
  );
}

export default InvoiceApp;

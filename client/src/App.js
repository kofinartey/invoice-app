import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";

import InvoiceApp from "./InvoiceApp";
import ScrollToTop from "./components/scroll_to_top/ScrollToTop";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div>
          <ScrollToTop>
            <InvoiceApp />
          </ScrollToTop>
        </div>
      </Provider>
    </Router>
  );
}

export default App;

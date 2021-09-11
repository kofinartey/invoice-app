import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";

import InvoiceApp from "./InvoiceApp";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div>
          <InvoiceApp />
        </div>
      </Provider>
    </Router>
  );
}

export default App;

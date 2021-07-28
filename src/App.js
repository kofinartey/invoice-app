import React from "react";
import store from "./redux/store";

import { Provider } from "react-redux";

import InvoiceApp from "./InvoiceApp";

function App() {
  return (
    <Provider store={store}>
      <div>
        <InvoiceApp />
      </div>
    </Provider>
  );
}

export default App;

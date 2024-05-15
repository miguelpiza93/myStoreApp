import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, ReactReduxContext } from "react-redux";
import StoreAppRoutes from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import store from "./store";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store} context={ReactReduxContext}>
      <BrowserRouter>
        <StoreAppRoutes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

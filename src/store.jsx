
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { products } from "./redux/product/product.reducer"
import { suppliers } from "./redux/supplier/supplier.reducer"
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = configureStore(
  {
    reducer: {
        products,
        suppliers,
    },
  },
  composedEnhancer
);

export default store;

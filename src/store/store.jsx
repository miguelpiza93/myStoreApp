
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
// import { productsReducer } from "./products"
import { productApi } from "../api/product/productApi";
import { supplierApi } from "../api/supplier/supplierApi";


export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
    // products: productsReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productApi.middleware, supplierApi.middleware]),
});

setupListeners(store.dispatch)

export default store;


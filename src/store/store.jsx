
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { productApi } from "../api/product/productApi";
import { supplierApi } from "../api/supplier/supplierApi";
import { purchaseOrderApi } from "../api/purchaseOrder/purchaseOrder";
import { stockApi } from "../api/stock/stockApi";
import { unitApi } from "../api/unit/unitApi";


export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
    [purchaseOrderApi.reducerPath]: purchaseOrderApi.reducer,
    [unitApi.reducerPath]: unitApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      supplierApi.middleware,
      purchaseOrderApi.middleware,
      unitApi.middleware,
      stockApi.middleware,
    ]),
});

setupListeners(store.dispatch)

export default store;


import { createSupplierRequest } from "../connections/createSupplier";

export const createSupplier = (data) => async (dispatch, getState) => {
  const result = await createSupplierRequest(data);
  dispatch({
    type: "ADD_SUPPLIER",
    ...result,
  })
};
import { getSuppliersRequest } from "../connections/getSuppliers";

export const getSuppliers = () => async (dispatch, getState) => {
  const data = await getSuppliersRequest();
  
  dispatch({
    type: "RECEIVE_SUPPLIERS",
    data,
  });
};
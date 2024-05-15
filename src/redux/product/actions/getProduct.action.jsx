import { getProductsRequest } from "../connections/getProducts";

export const getProducts = () => async (dispatch, getState) => {
  const data = await getProductsRequest();
  
  dispatch({
    type: "RECEIVE_PRODUCTS",
    data,
  });
};
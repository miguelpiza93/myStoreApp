import { createProductRequest } from "../connections/createProduct"

export const createProduct = (data) => async dispatch => {
  const result = await createProductRequest(data);
  dispatch({
    type: "ADD_PRODUCT",
    ...result,
  })
};
import axios from 'axios';
import config from "../../../config";

export const getProductsRequest = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}/api/v1/products`);
    return response.data;
  } catch (error) {
    console.error('Error getting product:', error);
  }
}
import axios from 'axios';
import config from "../../../config";

export const getSuppliersRequest = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}/api/v1/suppliers`);
    return response.data;
  } catch (error) {
    console.error('Error getting product:', error);
  }
}
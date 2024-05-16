import axios from 'axios';
import config from "../../../config";

export const createSupplierRequest = async (data) => {
  try {
    const response = await axios.post(`${config.apiUrl}/api/v1/suppliers`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating supplier:', error);
  }
}

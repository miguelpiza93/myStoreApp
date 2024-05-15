import axios from 'axios';
import config from "../../../config";

export const createProductRequest = async (productData) => {
  try {
    const response = await axios.post(`${config.apiUrl}/api/v1/products`, productData);
    return response.data;
    // Handle success, e.g., update state or show a success message
  } catch (error) {
    console.error('Error creating product:', error);
    // Handle error, e.g., show an error message
  }
}

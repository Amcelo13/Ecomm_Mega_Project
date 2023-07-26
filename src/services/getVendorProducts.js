import axios from "axios";

export const getVendorProducts = async (vendEmail) => {

  try {
    const response = await axios.get(`http://localhost:4000/products/${vendEmail}`);
    return response.data;

  } 
  catch (err) {
    return err
  }
};

import axios from "axios";

export const getVendorProducts = async (vendEmail) => {

  try {
    const response = await axios.get(`https://ecomm-mega-project.onrender.com/products/${vendEmail}`);
    return response.data;

  } 
  catch (err) {
    return err
  }
};

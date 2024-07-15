import axios from "axios";
export const getCartItems = async (userEmail) => {
    
  try {
    const response = await axios.get(`https://ecomm-mega-project.onrender.com/getCart/${userEmail}`)
    return response.data.cartItems;
  } catch (err) {
    console.log(err);
  }
};

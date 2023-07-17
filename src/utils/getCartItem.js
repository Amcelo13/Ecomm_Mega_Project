import axios from "axios";
export const getCartItems = async (userEmail) => {
    
  try {
    const response = await axios.get(`http://localhost:4000/getCart/${userEmail}`)
    return response.data.cartItems;
  } catch (err) {
    console.log(err);
  }
};

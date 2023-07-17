import axios from "axios";

export const getOrderItems = async (userEmail) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/getOrders/${userEmail}`
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

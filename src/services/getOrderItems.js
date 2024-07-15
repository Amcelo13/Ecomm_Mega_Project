import axios from "axios";

export const getOrderItems = (userEmail) => axios.get(`https://ecomm-mega-project.onrender.com/getOrders/${userEmail}`);

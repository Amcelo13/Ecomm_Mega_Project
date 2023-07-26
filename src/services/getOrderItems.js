import axios from "axios";

export const getOrderItems = (userEmail) => axios.get(`http://localhost:4000/getOrders/${userEmail}`);

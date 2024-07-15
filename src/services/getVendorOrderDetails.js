import axios from "axios"
export const getVendorOrderDetails = async(userEmail) =>{

    try {
        const response = await axios.get(`https://ecomm-mega-project.onrender.com/getVendorOrders/${userEmail}`)
        return response.data;
      }
       catch (err) {
        console.log(err);
      }
}
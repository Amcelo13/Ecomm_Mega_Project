import axios from "axios"
export const getVendorOrderDetails = async(userEmail) =>{

    try {
        const response = await axios.get(`http://localhost:4000/getVendorOrders/${userEmail}`)
        return response.data;
      }
       catch (err) {
        console.log(err);
      }
}
import axios from "axios"
export const cancelTheOrder = async(orderID) =>{
 
    await axios.get(`https://ecomm-mega-project.onrender.com/cancelOrder/${orderID}`).then((response) =>{
        console.log('Updated order status: ')
    }).catch((error) =>{
        console.log(error)
    })
}
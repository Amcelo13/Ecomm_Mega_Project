import axios from "axios"
export const cancelTheOrder = async(orderID) =>{
 
    await axios.get(`http://localhost:4000/cancelOrder/${orderID}`).then((response) =>{
        console.log('Updated order status: ')
    }).catch((error) =>{
        console.log(error)
    })
}
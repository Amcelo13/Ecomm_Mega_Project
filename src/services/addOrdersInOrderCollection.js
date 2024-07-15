import axios from "axios"
export const addOrdersInOrderCollection = async( cartItems, userName, selectedAddress, userEmail) => {
    
    const orderDetails = {
        userId:userEmail,
        userName:userName,
        status:'ordered',
        orderItems: cartItems,
        address:selectedAddress
    }
    await axios.post('https://ecomm-mega-project.onrender.com/addFinalOrder', orderDetails).then((response)=>{
            if(response.status === 200) {
                console.log(response)
            }
    }).catch((error)=>{

        console.log(error)
    })
}
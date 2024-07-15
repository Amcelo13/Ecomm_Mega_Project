import axios from "axios"
export const incrementProductSales =   (cartItems)=> {

    cartItems.forEach(async(cartItem)=> {
       //Acha logic for multiple cart items
        await axios.post(`https://ecomm-mega-project.onrender.com/updationOnOrdering/${cartItem.productID}`, { quantity :cartItem.quantity})
    })
}
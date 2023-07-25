import axios from "axios"
export const incrementProductSales =   (cartItems)=> {

    cartItems.forEach(async(cartItem)=> {
       //Acha logic for multiple cart items
        await axios.post(`http://localhost:4000/updationOnOrdering/${cartItem.productID}`, { quantity :cartItem.quantity})
    })
}
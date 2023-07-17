import axios from "axios"
export const handleOutOfStock = async(productID) => {

    await axios.get(`http://localhost:4000/markOutOfStock/${productID}`).then((response) =>{
        console.log('Updated out of stock')

    }).catch((error) =>{
        console.log(error)
    })
}
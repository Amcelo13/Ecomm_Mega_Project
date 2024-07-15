import axios from "axios"
export const getSpecificOrder = async(orderID) =>{

    try{
        const response = await axios.get(`https://ecomm-mega-project.onrender.com/specificOrder/${orderID}`)
        return response.data
        
    }   
    catch(err){
        console.log(err)
    }
}
import axios from "axios"
export const getSpecificOrder = async(orderID) =>{

    try{
        const response = await axios.get(`http://localhost:4000/specificOrder/${orderID}`)
        return response.data
        
    }   
    catch(err){
        console.log(err)
    }
}
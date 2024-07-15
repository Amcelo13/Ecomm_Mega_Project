import axios from "axios"
 export const setStatus =async (orderID, str) =>{
   
    try{
       await axios.post(`https://ecomm-mega-project.onrender.com/changeStatus/${orderID}`, {str}).then((response) =>{
        console.log('Status changed')
       }).catch((error) =>{
        console.log('Error occored: ' + error)
       })
    }

    catch(err){

    }
}
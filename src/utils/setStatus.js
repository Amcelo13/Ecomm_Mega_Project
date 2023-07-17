import axios from "axios"
 export const setStatus =async (orderID, str) =>{
   
    try{
       await axios.post(`http://localhost:4000/changeStatus/${orderID}`, {str}).then((response) =>{
        console.log('Status changed')
       }).catch((error) =>{
        console.log('Error occored: ' + error)
       })
    }

    catch(err){

    }
}
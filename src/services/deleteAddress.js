import axios from "axios"
export const deleteAddress  =async(id, email, setSample)=>{
    
    try{
            await axios.post('https://ecomm-mega-project.onrender.com/deleteAddress', {
                id,
                email
            }).then((response)=>{
                    if(response.status === 200){
                        console.log('Deleted Successfully')
                    }
            }).catch((error)=>{
                console.log('Error')
            })
    }
    catch(e){
        console.log(e)
    }
setSample((prev)=> !prev)
}
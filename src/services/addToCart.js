import axios from "axios"
export const addToCart = async(prod, vendorData,quanValue, userEmail) =>{

    const obj = {
        name: prod.name,
        price: prod.price,
        prodImage: 'https://images.pexels.com/photos/17491276/pexels-photo-17491276.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
        userId:userEmail,
        quantity:quanValue,
        vendorEmail:vendorData.email,
        productID:prod._id,
        images:prod.images
    }

    await axios.post('https://ecomm-mega-project.onrender.com/addToCart', obj).then((response)=>{
        if(response.status === 200) {
                console.log('New product added')
        }
        else if(response.status === 206){
            console.log('Cart updated successfully')
        }
    }).catch((err) => {
            console.log(err);
    })
}

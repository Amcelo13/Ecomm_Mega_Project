import axios from "axios";

export const handleOutOfStock = async(productID, boolValue) => {
 await axios.put(`https://ecomm-mega-project.onrender.com/markOutOfStock1`, { boolValue, productID });
};

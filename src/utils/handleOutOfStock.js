import axios from "axios";

export const handleOutOfStock = async(productID, boolValue) => {
 await axios.put(`http://localhost:4000/markOutOfStock1`, { boolValue, productID });
};

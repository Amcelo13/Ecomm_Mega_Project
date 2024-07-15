import axios from "axios";

export const vendorActivation = (vendorID, boolValue) => axios.put(`https://ecomm-mega-project.onrender.com/setVendorActivation/${vendorID}`, {boolValue})
import axios from "axios";

export const vendorActivation = (vendorID, boolValue) => axios.put(`http://localhost:4000/setVendorActivation/${vendorID}`, {boolValue})
import axios from "axios"
export const getVendorDetails = ()=> axios.get('http://localhost:4000/getAllVendors')

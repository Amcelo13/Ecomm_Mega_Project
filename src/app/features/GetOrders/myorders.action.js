import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderItems } from "../../../services/getOrderItems";


export const getOrders = createAsyncThunk("orders/getOrders", async(userEmail, {rejectedWithValue})=>{
    try{
        const response = await getOrderItems(userEmail)
        return response.data
    }
    catch(err){
        console.log(err)
        return rejectedWithValue(err)
    }
})
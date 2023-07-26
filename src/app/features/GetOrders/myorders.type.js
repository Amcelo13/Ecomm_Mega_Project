import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderItems } from "../../../services/getOrderItems";

export const getOrders = createAsyncThunk("orders/getOOrders", async(userEmail, {rejectedWithValue})=>{
    try{
        const response = await getOrderItems(userEmail)
        return response.data
    }
    catch(err){
        console.log(err)
        return rejectedWithValue(err)
    }
})
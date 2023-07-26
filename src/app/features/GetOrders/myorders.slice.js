import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "./myorders.type";

const initialState = {
  orders: [],
};

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.pending = false;
      })
      .addCase(getOrders.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default OrderSlice.reducer;
export const { getOOrders } = OrderSlice.actions;

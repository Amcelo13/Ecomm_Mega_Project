import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "./myorders.action";

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
};

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrders.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error;
      });
  },
});

export default OrderSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  users: {},
  isLoggedIn: false,
  currentNumber: -1,
  userPresent: false,
  cartQuantity: 0,
};

export const templateSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = true;
      state.users = action.payload;
      state.userPresent = true;
    },
    setNewName: (state, action) => {
      state.users = { ...state.users, name: action.payload };
    },
    increaseQuantity: (state, action) => {
      state.cartQuantity += action.payload;
    },
    decreaseQuantity: (state, action) => {
      state.cartQuantity -= action.payload;
    },
    setLogout: (state, action) => {
      state.isLoggedIn = false;
      state.users = {};
      state.userPresent = false;
    },
  },

 
});

export const {
  setLogin,
  setUser,
  increaseQuantity,
  decreaseQuantity,
  setLogout,
} = templateSlice.actions;

//selectors
export const selectUser = (state) => state.users;

export default templateSlice.reducer;

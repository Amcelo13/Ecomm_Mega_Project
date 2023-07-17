import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {},
  isLoggedIn: false,
  currentNumber: -1,
  currentRoom: "-1",
  CurrentUser: "",
  CurrentUserId: -1,
  currentReciever: {},
};

export const templateSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      setLogin: (state, action) => {
        state.isLoggedIn = true;
        state.users = action.payload;
        //   state.currentNumber = action.payload.currentNumber;
      },
      setNewName:(state, action) => {
      state.users = {...state.users, name: action.payload } 
      },
      setLogout:(state, action) => {
        state.isLoggedIn = false;
        state.users = {}
      }
    },
  });
  export const {
    setLogin,
    setUser,
    setReciever,
    setRoom,
    setUserId,
    setNewName,

    setLogout,
  } = templateSlice.actions;
  
  //selectors
  export const selectUser = (state) => state.users;
  
  export default templateSlice.reducer;
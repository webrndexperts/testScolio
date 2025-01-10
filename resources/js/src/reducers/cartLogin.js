
// https://blog.openreplay.com/building-a-shopping-cart-in-react-with-redux-tools/
import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
const cartLogin = createSlice({
    name:"CartLogin",
    initialState:{
        CartLogin : false,
    },
    reducers:{
        CartLogin:(state,action)=>{
            state.CartLogin = action.payload;
        },
    }
});
export const CartLoginStatus = cartLogin.reducer;
export const {CartLogin} = cartLogin.actions;

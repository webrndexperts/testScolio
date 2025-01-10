
// https://blog.openreplay.com/building-a-shopping-cart-in-react-with-redux-tools/
import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
const authSlice = createSlice({
    name:"auth",
    initialState:{
        authLogin : false,
        authData:[]
    },
    reducers:{
        userLogin:(state,action)=>{
            state.authLogin = action.payload.success;
            state.authData = action.payload.user_data;
        },
        userLogout:(state,action)=>{
            state.authLogin = action.payload.success;
            state.authData = action.payload;
        },
    }
});
export const authReducer = authSlice.reducer;
export const {userLogin,userLogout} = authSlice.actions;

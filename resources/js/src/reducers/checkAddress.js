
// https://blog.openreplay.com/building-a-shopping-cart-in-react-with-redux-tools/
import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
const checkAddress = createSlice({
    name:"checkAddress",
    initialState:{
        checkAddress : "",
    },
    reducers:{
        checkAddressSelect:(state,action)=>{
            state.checkAddress = action.payload;
        },
    }
});
export const AddressSelect = checkAddress.reducer;
export const {checkAddressSelect} = checkAddress.actions;

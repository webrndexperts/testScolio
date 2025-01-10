import axios from "axios";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const API = process.env.REACT_APP_API_URL
export const fetchMenuItem = createAsyncThunk("fetchMenuItem",async(_,{getState})=>{
    const currentLanguage = getState().language.currentLanguage;
    // console.log("sdf-------",currentLanguage);
    try {
        const res = await axios.get(`${API}menuitem/header/${currentLanguage}`);
        return res.data;
    } catch (error) {
        console.log("menuItemError---",error);
    }
});

const menuSlice = createSlice({
    name:"menu",
    initialState:{
        isLoading:false,
        isError:null,
        menuData:[]
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchMenuItem.pending,(state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchMenuItem.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.menuData = action.payload;
        })
        builder.addCase(fetchMenuItem.rejected,(state,action)=>{
              state.isError = action.payload
        })
    }
});
export default menuSlice.reducer;
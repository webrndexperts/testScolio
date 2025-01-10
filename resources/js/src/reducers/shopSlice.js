// import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// const API = process.env.REACT_APP_API_URL
// export const fetchShop = createAsyncThunk("fetchShop",async(_, { getState })=>{
//     const currentLanguage = getState().language.currentLanguage;
//     try {
//         const res = await axios.get(`${API}products/filter/${currentLanguage}`);
//          return res;
//     } catch (error) {
//         console.log("res---------",error);
//     }
// });

// export const fetchProductDetail = createAsyncThunk("fetchProductDetail",async({ slug, lang }, { getState })=>{
//     try {
//          const  res = await axios.get(`${API}products/${slug}/${lang}`);
//          return res.data;
//     } catch (error) {
//         console.log("res---------",error);
//     }
// })

// const shopSlice = createSlice({
//     name: "shop",
//     initialState: {
//      isLoading: false,
//      shopData: [],
//      isError: false
//     },
//     extraReducers: (builder) => {
//      builder.addCase(fetchShop.pending, (state) => {
//       state.isLoading = true;
//      })
//      builder.addCase(fetchShop.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.shopData = action.payload;
//      })
//      builder.addCase(fetchShop.rejected, (state) => {
//       state.isError = true;
//      })
//     }
//    });
//    export const { reducer: shopReducer } = shopSlice;

//    const productDetailSlice = createSlice({
//     name:"productDetail",
//     initialState:{
//         isLoading:false,
//         productDetail:[],
//         isError:null
//     },
//     extraReducers:(builder)=>{
//         builder.addCase(fetchProductDetail.pending,(state)=>{
//             state.isLoading = true;
//         })
//         builder.addCase(fetchProductDetail.fulfilled,(state,action)=>{
//             state.isLoading = false;
//             state.isError = false;
//             state.productDetail = action.payload;
//         })
//         builder.addCase(fetchProductDetail.rejected,(state,action)=>{
//             state.isError = action.payload
//         })
//     }
//    });
//    export const { reducer: productDetailReducer } = productDetailSlice;
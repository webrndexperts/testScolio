import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API = process.env.REACT_APP_API_URL

export const fetchTestimonials = createAsyncThunk("fetchTestimonials",async(_,{getState})=>{
    const currentLanguage = getState().language.currentLanguage;
    try {
        const res = await axios.get(`${API}testimonials/filter/${currentLanguage}`);
         return res.data;
    } catch (error) {
        console.log(error);
    }
});

export const fetchXrays = createAsyncThunk("fetchXrays",async(_,{getState})=>{
    const currentLanguage = getState().language.currentLanguage;
    try {
        const res = await axios.get(`${API}xrays/filter/${currentLanguage}`);
         return res.data;
    } catch (error) {
        console.log(error);
    }
});

export const fetchWorldPatients = createAsyncThunk("fetchWorldPatients",async(_,{getState})=>{
    const currentLanguage = getState().language.currentLanguage;
    try {
        const res = await axios.get(`${API}patients-worldwide/filter/${currentLanguage}`);
         return res.data;
    } catch (error) {
        console.log(error);
    }
})

const testimonialSlice = createSlice({
    name: "testimonial",
    initialState: {
     isLoading: false,
     Testimonial: [],
     isError: false
    },
    extraReducers: (builder) => {
     builder.addCase(fetchTestimonials.pending, (state) => {
      state.isLoading = true;
     })
     builder.addCase(fetchTestimonials.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Testimonial = action.payload;
     })
     builder.addCase(fetchTestimonials.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
     })
    }
});

const xraysSlice = createSlice({
    name:"xrays",
    initialState:{
        isLoading:false,
        XrayData :[],
        isError:false
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchXrays.pending,(state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchXrays.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.XrayData = action.payload;
        })
        builder.addCase(fetchXrays.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
        })
    }
});

const worldPatientSlice = createSlice({
    name:"worldPatient",
    initialState:{
        isLoading:false,
        WorldPatientData :[],
        isError:false
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchWorldPatients.pending,(state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchWorldPatients.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.WorldPatientData = action.payload;
        })
        builder.addCase(fetchWorldPatients.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
        })
    }
});
export const {reducer: xraysReducer}= xraysSlice;
export const { reducer: testimonialReducer } = testimonialSlice;
export const {reducer:worldPatientReducer}=worldPatientSlice





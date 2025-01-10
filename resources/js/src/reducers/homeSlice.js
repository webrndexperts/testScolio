import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API = process.env.REACT_APP_API_URL

export const fetchNonTreatments = createAsyncThunk("fetchNonTreatments", async (_, { getState }) => {
    const currentLanguage = getState().language.currentLanguage;
    try {
        const res = await axios.get(`${API}nontreatment/filter/${currentLanguage}`);
        return res.data;
    } catch (error) {
        console.log("res---------", error);
    }
});

export const fetchSpecial = createAsyncThunk("fetchSpecial", async (_, { getState }) => {
     const currentLanguage = getState().language.currentLanguage;
    try {
        const res = await axios.get(`${API}specailoffer/filter/${currentLanguage}`);
        return res.data;
    } catch (error) {
        console.log("res---------", error);
    }
});

export const fetchBenifits = createAsyncThunk("fetchBenifits", async (_, { getState }) => {
    const currentLanguage = getState().language.currentLanguage;
    try {
        const res = await axios.get(`${API}benifitshomepage/filter/${currentLanguage}`);
        return res.data;
    } catch (error) {
        console.log("res---------", error);
    }
});

export const fetchFaqs = createAsyncThunk("fetchFaqs", async (_, { getState }) => {
    const currentLanguage = getState().language.currentLanguage;
    try {
        const res = await axios.get(`${API}accordions/filter/${currentLanguage}`);
        return res.data;
    } catch (error) {
        console.log("res---------", error);
    }
})

const nontreatmentSlice = createSlice({
    name: "nontreatment",
    initialState: {
        isLoading: false,
        nontreatmentData: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNonTreatments.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchNonTreatments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.nontreatmentData = action.payload;
        })
        builder.addCase(fetchNonTreatments.rejected, (state) => {
            state.isError = true;
        })
    }
});

const specialSlice = createSlice({
    name: "special",
    initialState: {
        isLoading: false,
        specialData: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSpecial.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchSpecial.fulfilled, (state, action) => {
            state.isLoading = false;
            state.specialData = action.payload;
        })
        builder.addCase(fetchSpecial.rejected, (state) => {
            state.isError = true;
        })
    }
});

const benifitSlice = createSlice({
    name: "benifits",
    initialState: {
        isLoading: false,
        benifitData: [],
        isError: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBenifits.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchBenifits.fulfilled, (state, action) => {
            state.benifitData = action.payload;
            state.isLoading = false;
        })
        builder.addCase(fetchBenifits.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload
        })
    }
});

const faqSlice = createSlice({
    name: "faq",
    initialState: {
        isLoading: false,
        faqData: [],
        isError: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFaqs.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchFaqs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.faqData = action.payload;
        })
        builder.addCase(fetchFaqs.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
    }
});

export const { reducer: faqReducer } = faqSlice;
export const { reducer: benifitReducer } = benifitSlice;
export const { reducer: specialReducer } = specialSlice;
export const { reducer: nontreatmentReducer } = nontreatmentSlice;
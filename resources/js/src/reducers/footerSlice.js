// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// const API = process.env.REACT_APP_API_URL

// export const fetchFooterMenu = createAsyncThunk("fetchFooterMenu", async (_, { getState }) => {
//     const currentLanguage = getState().language.currentLanguage;
//     try {
//         const res = axios.get(`${API}footermenu/filter/${currentLanguage}`);
//         return res;
//     } catch (error) {
//         console.log(error);
//     }
// });

// export const fetchContactInfo = createAsyncThunk("fetchContactInfo", async (_, { getState }) => {
//     const currentLanguage = getState().language.currentLanguage;
//     try {
//         const res = axios.get(`${API}contactinfo/filter/${currentLanguage}`);
//         return res;
//     } catch (error) {
//         console.log(error);
//     }
// });

// export const fetchTelephone = createAsyncThunk("fetchTelephone", async (_, { getState }) => {
//     const currentLanguage = getState().language.currentLanguage;
//     try {
//         const res = axios.get(`${API}telephonewidget/filter/${currentLanguage}`);
//         return res;
//     } catch (error) {
//         console.log(error);
//     }
// });

// export const fetchOpeningHours = createAsyncThunk("fetchOpeningHours", async (_, { getState }) => {
//     const currentLanguage = getState().language.currentLanguage;
//     try {
//         const res = axios.get(`${API}openinghourswidget/filter/${currentLanguage}`);
//         return res;
//     } catch (error) {
//         console.log(error);
//     }
// });

// const footerMenuSlice = createSlice({
//     name: "footerMenu",
//     initialState: {
//         isLoading: false,
//         footerMeduData: [],
//         isError: null,
//         responseHeaders: {},
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchFooterMenu.pending, (state) => {
//             state.isLoading = true;
//         })
//         builder.addCase(fetchFooterMenu.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.footerMeduData = action.payload.data;
//             state.responseHeaders = action.payload.headers;
//         })
//         builder.addCase(fetchFooterMenu.rejected, (state, action) => {
//             state.isLoading = false;
//             state.isError = action.payload;
//         })
//     }
// });

// const contactInfoSlice = createSlice({
//     name: "contactInfo",
//     initialState: {
//         isLoading: false,
//         contactInfoData: [],
//         isError: null,
//         responseHeaders: {},
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchContactInfo.pending, (state) => {
//             state.isLoading = true;
//         })
//         builder.addCase(fetchContactInfo.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.contactInfoData = action.payload.data;
//             state.responseHeaders = action.payload.headers;
//         })
//         builder.addCase(fetchContactInfo.rejected, (state, action) => {
//             state.isLoading = false;
//             state.isError = action.payload;
//         })
//     }
// });

// const telephoneSlice = createSlice({
//     name: "telephone",
//     initialState: {
//         isLoading: false,
//         telephoneData: [],
//         isError: null,
//         responseHeaders: {},
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchTelephone.pending, (state) => {
//             state.isLoading = true;
//         })
//         builder.addCase(fetchTelephone.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.telephoneData = action.payload.data;
//             state.responseHeaders = action.payload.headers;
//         })
//         builder.addCase(fetchTelephone.rejected, (state, action) => {
//             state.isLoading = false;
//             state.isError = action.payload;
//         })
//     }
// });

// const openingHourSlice = createSlice({
//     name: "openingHour",
//     initialState: {
//         isLoading: false,
//         openingHourData: [],
//         isError: null,
//         responseHeaders: {},
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchOpeningHours.pending, (state) => {
//             state.isLoading = true;
//         })
//         builder.addCase(fetchOpeningHours.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.openingHourData = action.payload.data;
//             state.responseHeaders = action.payload.headers;
//         })
//         builder.addCase(fetchOpeningHours.rejected, (state, action) => {
//             state.isLoading = false;
//             state.isError = action.payload;
//         })
//     }
// });

// export const { reducer: openingHourReducer } = openingHourSlice;
// export const { reducer: telephoneReducer } = telephoneSlice;
// export const { reducer: contactInfoReducer } = contactInfoSlice;
// export const { reducer: footerMenuReducer } = footerMenuSlice;

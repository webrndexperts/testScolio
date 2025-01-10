// /reducers/languageSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { matchUrlAndStoredLanguage } from "../hooks/customFunctions";

const defaultLanguage = matchUrlAndStoredLanguage();
const defaultUrlLanguage =
    defaultLanguage == "en_US" ? "" : `/${defaultLanguage}`;
// debugger
const languageSlice = createSlice({
    name: "language",
    initialState: {
        currentLanguage: defaultLanguage,
        urlLanguage: defaultUrlLanguage,
    },
    reducers: {
        setLanguage: (state, action) => {
            state.currentLanguage = action.payload;
        },
        setUrlLanguage: (state, action) => {
            state.urlLanguage =
                action.payload == "en_US" ? "" : `/${action.payload}`;
        },
        initializeLanguage: (state, action) => {
            state.currentLanguage = action.payload.language;
            state.urlLanguage = action.payload.urlLanguage;
        },
    },
});

export const { setLanguage, setUrlLanguage , initializeLanguage } = languageSlice.actions;
export const selectLanguage = (state) => state.language.currentLanguage;
export const selectUrlLanguage = (state) => state.language.urlLanguage;
export default languageSlice.reducer;

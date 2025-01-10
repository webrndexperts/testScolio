// /reducers/index.js
import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './articleSlice'
import languageReducer from './languageSlice';
// import { shopReducer,productDetailReducer } from './shopSlice';
import { cartReducer } from './cartSlice';
import menuItemSlice from './menuItemSlice';
import { testimonialReducer,xraysReducer,worldPatientReducer } from './resultsSlices';
import { nontreatmentReducer,benifitReducer,specialReducer,faqReducer } from './homeSlice';
import { authReducer } from './authSlice';
import { CartLoginStatus } from './cartLogin';
import { AddressSelect } from './checkAddress';
// import { footerMenuReducer,contactInfoReducer,telephoneReducer,openingHourReducer } from './footerSlice';
const store = configureStore({
  reducer: {
    article: articleReducer,
    language: languageReducer,
    CartLoginStatus:CartLoginStatus,
    AddressSelect:AddressSelect,
    // shop:shopReducer,
    // productDetail:productDetailReducer,
    cart:cartReducer,
    auth:authReducer,
    menu:menuItemSlice,
    testimonial:testimonialReducer,
    xrays:xraysReducer,
    worldPatient:worldPatientReducer,
    nontreatment:nontreatmentReducer,
    special:specialReducer,
    benifits:benifitReducer,
    faq:faqReducer,
    // footerMenu:footerMenuReducer,
    // contactInfo:contactInfoReducer,
    // telephone:telephoneReducer,
    // openingHour:openingHourReducer
  },
});

export default store;

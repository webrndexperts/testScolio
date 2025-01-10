
// https://blog.openreplay.com/building-a-shopping-cart-in-react-with-redux-tools/
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:[],
        directCart: [],
        contactData: null,
    },
    reducers:{
        addToCart:(state, action) => {
            const itemImCart = state.cart.find((item)=>item.id === action.payload.id);
            const matchingItemImCart = state.cart.find((item)=>item.productType && action.payload.productType  === "aws3-bucket-product");

            if(itemImCart && matchingItemImCart === undefined) {
                if(itemImCart.attriuteConsultant && itemImCart.attriuteConsultant != action.payload.attriuteConsultant) {
                    var removeItem = state.cart.filter((item)=>item.id != action.payload.id);

                    state.cart = removeItem;
                    state.cart.push({...action.payload});
                } else {
                    itemImCart.quantity++
                }
                toast.success('Item added successfully');
            } else if(itemImCart && matchingItemImCart){
                // itemImCart
                toast.success('Item already avalable');
            } else{
                state.cart.push({...action.payload});
                toast.success('Item added successfully');
            }
        },
        addMultipleToCart: (state, action) => {
            state.cart = [...state.cart, ...action.payload];
        },
        addContactData: (state, action) => {
            state.contactData = action.payload;
        },
        /**
         * Function to add value to the direct buy state.
         */
        addToDirectCart:(state, action) => {
            var values = [];
            values.push(action.payload);

            // adding only single value to the direct orderning
            state.directCart = values;
            // localStorage.setItem('direct_buy', JSON.stringify(action.payload));
        },
        incrementQuantity:(state,action)=> {
            const item = state.cart.find((item)=>item.id === action.payload);
            item.quantity++;
        },
        decrementQuantity:(state,action)=>{
            const item = state.cart.find((item)=>item.id === action.payload);
            if(item.quantity === 1){
                item.quantity = 1
            }else{
                item.quantity--;
            }
        },
        removeItem:(state,action)=>{
            const removeItem = state.cart.filter((item)=>item.id !== action.payload);
            state.cart = removeItem;
            toast.success('Item removed succesfuly');
            localStorage.setItem('cart', JSON.stringify(removeItem));
        },
        /**
         * Function to remove value from the direct buy state.
         */
        removeDirectBuyItem: (state, payload) => {
            state.directCart = [];
            // localStorage.removeItem('direct_buy');
        },
        replaceItem:(state,action)=>{
            state.cart = action.payload;
        }
    }
});

export const cartReducer = cartSlice.reducer;

export const {
    addToCart,
    addMultipleToCart,
    addToDirectCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    removeDirectBuyItem,
    replaceItem,
    addContactData,
} = cartSlice.actions;


// https://blog.openreplay.com/building-a-shopping-cart-in-react-with-redux-tools/
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:[]
    },
    reducers:{
        addToCart:(state,action) => {
            const itemImCart = state.cart.find((item)=>item.id === action.payload.id);
            const matchingItemImCart = state.cart.find((item)=>item.productType && action.payload.productType  === "aws3-bucket-product");

            // console.log("matchingItemImCart",matchingItemImCart);
            
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
        incrementQuantity:(state,action)=>{
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
        replaceItem:(state,action)=>{
            state.cart = action.payload;
        }
    }
});
export const cartReducer = cartSlice.reducer;
export const {addToCart,incrementQuantity,decrementQuantity,removeItem,replaceItem} = cartSlice.actions;

import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2'
const initialState={
    cart:[],
};

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart(state,action){
            console.log(action)
            console.log(state)
            // if(action.payload.id)
            if(state.cart.length > 4){
                Swal.fire(`you have maxium ${state.cart.length} quantity allowed`);
            }else{
                state.cart=[...state.cart,action.payload]
            }
        }
    }
})
// console.log(cartSlice)
export const { addToCart }=cartSlice.actions;
export default cartSlice.reducer;
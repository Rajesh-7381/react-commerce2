import { createSlice } from '@reduxjs/toolkit';

const initialState={
    paymentMethod:'',
}

const paymentSlice=createSlice({
    name:'payment',
    initialState,
    reducers:{
        setPaymentMethod:(state,action)=>{
            state.paymentMethod=action.payload
        }
    }
});

export const { setPaymentMethod }=paymentSlice.actions;
export default paymentSlice.reducer;
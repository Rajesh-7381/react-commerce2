import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../redux/features/productSlice';
import cartReducer from '../redux/features/cartSlice'
import PaymentReducer from '../redux/features/paymentSlice'

const store = configureStore({
  reducer: {
    product: productReducer,
    allCart:cartReducer,
    payment:PaymentReducer,
  },
});

export default store;

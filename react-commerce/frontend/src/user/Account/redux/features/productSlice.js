import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quantity: 1,
  products: [],
  sortedProducts: [],
  currentPage: 1,
  productsPerPage: 9,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    incrementQuantity(state) {
      
      if(state.quantity < 5){
        state.quantity = Math.min(state.quantity + 1, 100); // here 100 means allowed 100 not above
        
      }else{
        alert("no more quantity allowed")
      }

    },
    decrementQuantity(state) {
      if(state.quantity === 1){
        alert("minium 1 quantity will be added")
      }else{
        state.quantity = Math.max(state.quantity - 1);
      }
      
    },
    setProducts(state, action) {
      state.products = action.payload;
      state.sortedProducts = action.payload;
    },
    setSortedProducts(state, action) {
      state.sortedProducts = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const {
  incrementQuantity,
  decrementQuantity, // Ensure this is correctly named
  setProducts,
  setSortedProducts,
  setCurrentPage,
} = productSlice.actions;

export default productSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quantity: 1,
  products: [],
  sortedProducts: [],
  currentPage: 1,
  productsPerPage: 9,
  finalPrice:0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    incrementQuantity(state,action) {
      
      if(state.quantity < 5){
        
        state.quantity = Math.min(state.quantity + 1, 5); // here 5 means allowed 5 not above
        state.finalPrice=action.payload * state.quantity;
        
      }else{
        alert("no more quantity allowed")
      }

    },
    decrementQuantity(state,action) {
      if(state.quantity === 1){
        alert("minium 1 quantity will be added")
      }else{
        state.quantity = Math.max(state.quantity - 1);
        state.finalPrice=action.payload * state.quantity;
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
// console.log(productSlice)
export default productSlice.reducer;

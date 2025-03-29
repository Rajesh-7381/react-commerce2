
// This imports the createSlice function from Redux Toolkit, which is a utility that helps create Redux reducers and actions in a more concise way.
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  addTodo: [], //This will be an array where you store all the todo items.
  filter: 'all', //This will manage the current filter state for the todos (e.g., all, completed, active).
};

// Create a slice of the store
const storeSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addItem: (state, action) => {
      // console.log(state)
      // console.log(action)
        state.addTodo.push(action.payload); // Add new todo item
    },
    deleteItem:(state,action)=>{
      // console.log(state)
      // console.log(action)
      state.addTodo=state.addTodo.filter((_, index)=> index !== action.payload) // The _ is a common convention in JavaScript to indicate that a variable is not going to be used in the function.
    }
  }
});

// Export actions and reducer
export const { addItem,deleteItem } = storeSlice.actions;
export default storeSlice.reducer;

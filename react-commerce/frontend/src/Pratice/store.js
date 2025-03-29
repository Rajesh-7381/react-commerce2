//This imports the configureStore function from Redux Toolkit, which is a utility for creating a Redux store with sensible defaults.
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './storeSlice'; // Import the todo reducer

const store = configureStore({
    reducer: {
        // Correctly use 'todo' as the key for your reducer
        todo: todoReducer,  // Now the state structure will have 'todo.addTodo'
        
    }
    
});

export default store;

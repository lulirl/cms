// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import challengesReducer from '../store/challengesSlice'; 
import categoriesReducer from '../store/categoriesSlice'
import authReducer from '../store/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    challenges: challengesReducer,
    categories: categoriesReducer,
    // Add more reducers here if needed
  },
});

export default store;

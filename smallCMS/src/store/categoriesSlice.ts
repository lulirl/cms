// src/store/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from '../features/actions.ts'
import { Categories } from '../features/models/categories.ts';
interface categories {
  loading: 'idle' | 'pending' | 'fulfilled' | "failed",
  data: Categories[]
}
const initialState = {
    data: [],
    loading: 'idle'
} as categories
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state)=> {
      state.loading = "pending"
    });
    builder.addCase(getCategories.fulfilled, (state,action)=> {
      state.loading = "fulfilled";
      state.data = action.payload
    })
    builder.addCase(getCategories.rejected, (state)=> {
      state.loading = 'failed'
    })
  }
});

export default categoriesSlice.reducer;

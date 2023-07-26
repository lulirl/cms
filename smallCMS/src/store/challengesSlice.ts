// src/store/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getChallenges } from '../features/actions.ts'
import { Challenge } from '../features/models/challenges.ts';
interface challengesTemplates {
  loading: 'idle' | 'pending' | 'fulfilled' | "failed",
  data: Challenge []
}
const initialState = {
    data: [],
    loading: 'idle'
} as challengesTemplates
const challengesSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChallenges.pending, (state)=> {
      state.loading = "pending"
    });
    builder.addCase(getChallenges.fulfilled, (state,action)=> {
      state.loading = "fulfilled";
      state.data = action.payload
    })
    builder.addCase(getChallenges.rejected, (state)=> {
      state.loading = 'failed'
    })
  }
});

export default challengesSlice.reducer;

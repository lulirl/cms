import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPredefinedChallenges } from './services';
import { getPredefinedCategories } from './services';
export const getChallenges = createAsyncThunk(
  'allChallenges/getChallenges',
  async (_, { rejectWithValue }) => {
    try {
      const challenges = await getPredefinedChallenges();
      return challenges
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCategories = createAsyncThunk(
  'allCategories/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await getPredefinedCategories();
      return categories
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



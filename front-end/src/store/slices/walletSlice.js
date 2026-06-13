import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as walletService from "./../../services/walletService";

export const deposit = createAsyncThunk(
  "wallet/deposit",
  async (amount, thunkAPI) => {
    try {
      return await walletService.deposit(amount);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

const initialState = {
  amount: 0,
  isLoading: false,
  error: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(deposit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deposit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.amount = action.payload.amount;
      })
      .addCase(deposit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default walletSlice.reducer;

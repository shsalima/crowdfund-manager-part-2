import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

export const fetchUserBalance = createAsyncThunk(
  "balance/fetchUserBalance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${VITE_API_URL}/balance`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      return response.data; 
    } catch (error) {
      console.log("Error fetching balance:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch balance");
    }
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    amount: 0, 
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.amount = action.payload?.amount || 0; 
      })
      .addCase(fetchUserBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default balanceSlice.reducer;
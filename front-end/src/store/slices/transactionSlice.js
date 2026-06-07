import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    items: [],
  },
  reducers: {
    addTransaction: (state, action) => {
      state.items.unshift({
        id: Date.now(),
        type: "deposit",
        amount: action.payload.amount,
        description: "Wallet deposit",
        date: new Date().toISOString(),
      });
    },
  },
});

export const { addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;

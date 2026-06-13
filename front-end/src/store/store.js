import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import projectSlice from "./slices/projectSlice";
import walletSlice from "./slices/walletSlice";
import balanceSlice from "./slices/balanceSlice";
import portfolioSlice from "./slices/portfolioSlice";
import transactionSlice from "./slices/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    projects: projectSlice,
    balance: balanceSlice,
    portfolio: portfolioSlice,
    wallet: walletSlice,
    transactions: transactionSlice,
  },
});

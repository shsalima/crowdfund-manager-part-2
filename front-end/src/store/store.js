import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import projectSlice from "./slices/projectSlice"

import balanceSlice from "./slices/balanceSlice";
import portfolioSlice from "./slices/portfolioSlice";



export const store=configureStore({
    reducer:{
        auth: authSlice,
        projects:projectSlice,
        balance: balanceSlice,
        portfolio: portfolioSlice
   
    }
})
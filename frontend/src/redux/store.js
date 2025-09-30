import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import authLogin from "./slices/loginSlices"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        auth: authLogin,
    }
})
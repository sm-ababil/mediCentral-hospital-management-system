import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
    name: "alert",
    initialState: {
        loading: false,
        success: false,
        message: "",
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        },
    },
});

export const {showLoading, hideLoading} = alertSlice.actions;
export default alertSlice.reducer;
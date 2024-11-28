// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {Cookies} from "react-cookie";

const initialState = {
    accessToken: null,
    refreshToken: null,
    admno: null,
};

// const cookies = new Cookies();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens(state, action) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        // setAccessTokens(state, action) {
        //     state.accessToken = action.payload.accessToken;
        //     // cookies.set("admin", {path: '/'})
        // },
        // setRefreshTokens(state, action) {
        //     state.refreshToken = action.payload.refreshToken;
        //     // cookies.set("admin", {path: '/'})
        // },
        setAdmno(state, action) {
            state.admno = action.payload;
            // cookies.set("admin", {path: '/'})
        },
        clearAuth(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.admno = null;
        },
    },
});

export const { setAccessTokens, setRefreshTokens, setAdmno, clearAuth, setTokens } = authSlice.actions;

export default authSlice.reducer;
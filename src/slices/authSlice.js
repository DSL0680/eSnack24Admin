// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    refreshToken: null,
    admno: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens(state, action) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setAdmno(state, action) {
            state.admno = action.payload;
        },
        clearAuth(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.admno = null;
        },
    },
});

export const { setTokens, setAdmno, clearAuth } = authSlice.actions;

export default authSlice.reducer;
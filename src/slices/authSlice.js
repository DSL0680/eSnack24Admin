// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    refreshToken: null,
    admno: 0,
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
        setAdmno(state, action) {
            state.admno = action.payload.admno;
        },
        clearAuth(state, action) {

            return {...initialState}
        },
    },
});

export const { setAdmno, clearAuth, setTokens } = authSlice.actions;

export default authSlice.reducer;
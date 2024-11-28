// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {Cookies} from "react-cookie";

const initialState = {
    accessToken: null,
    refreshToken: null,
    admno: 0,
};

const cookies = new Cookies();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.admno = action.payload.admno;

            const result =
                {admno: action.payload.admno, accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken};

            cookies.set("auth", JSON.stringify(result), {path: '/'});
        },
        clearAuth(state, action) {

            return {...initialState}
        },
    },
});

export const { clearAuth, setAuth } = authSlice.actions;

export default authSlice.reducer;